import { Request, Response } from "express";
import dns from "dns";
import { promisify } from "util";
import { z } from "zod";

// Promisify DNS methods
const resolveDns = promisify(dns.resolve);
const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);
const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);
const resolveNs = promisify(dns.resolveNs);
const resolveCname = promisify(dns.resolveCname);

// GET /api/dns-lookup - Perform DNS lookup on a domain
export async function dnsLookup(req: Request, res: Response): Promise<void> {
  try {
    const domainSchema = z.string().min(1).refine((domain) => {
      // Basic domain validation
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
      return domainRegex.test(domain);
    }, { message: "Invalid domain format" });
    
    const typeSchema = z.enum(["A", "AAAA", "CNAME", "MX", "TXT", "NS"]);
    
    const domain = domainSchema.parse(req.query.domain);
    const type = typeSchema.parse(req.query.type);
    
    let results: string[] = [];
    
    switch (type) {
      case "A":
        results = await resolve4(domain);
        break;
      case "AAAA":
        results = await resolve6(domain);
        break;
      case "CNAME":
        results = await resolveCname(domain);
        break;
      case "MX":
        const mxResults = await resolveMx(domain);
        results = mxResults.map(mx => `Priority: ${mx.priority}, Exchange: ${mx.exchange}`);
        break;
      case "TXT":
        const txtResults = await resolveTxt(domain);
        results = txtResults.flat();
        break;
      case "NS":
        results = await resolveNs(domain);
        break;
      default:
        res.status(400).json({ error: "Invalid record type" });
        return;
    }
    
    res.json({
      domain,
      type,
      results
    });
  } catch (error) {
    console.error("Error looking up DNS:", error);
    
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
      return;
    }
    
    // DNS lookup errors
    if (error instanceof Error && 'code' in error) {
      const dnsError = error as Error & { code: string };
      
      if (dnsError.code === 'ENOTFOUND' || dnsError.code === 'ENODATA') {
        res.json({ domain: req.query.domain, type: req.query.type, results: [] });
        return;
      }
    }
    
    res.status(500).json({ error: "Failed to lookup DNS information" });
  }
}