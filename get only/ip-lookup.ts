import { Request, Response } from "express";
import { storage } from "../server/storage";

// GET /api/ip-lookup - Look up a specific IP address
export async function ipLookup(req: Request, res: Response): Promise<void> {
  try {
    const { ip } = req.query;
    
    if (!ip || typeof ip !== 'string') {
      res.status(400).json({ error: "IP address is required" });
      return;
    }
    
    // Validate IP format (basic validation)
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    if (!ipRegex.test(ip)) {
      res.status(400).json({ error: "Invalid IP address format" });
      return;
    }
    
    // Use ipwho.is which has generous rate limits
    const geoResponse = await fetch(`https://ipwho.is/${ip}`);
    
    if (!geoResponse.ok) {
      res.status(geoResponse.status).json({ error: "Failed to fetch IP information" });
      return;
    }
    
    const geoData = await geoResponse.json();
    
    if (geoData.success === false) {
      res.status(400).json({ error: geoData.message || "Failed to fetch IP information" });
      return;
    }
    
    // Map the response to our expected format
    const ipInfo = {
      ip: ip || geoData.ip,
      city: geoData.city,
      region: geoData.region,
      country: geoData.country,
      country_code: geoData.country_code?.toLowerCase(),
      postal: geoData.postal,
      latitude: geoData.latitude,
      longitude: geoData.longitude,
      timezone: geoData.timezone?.id,
      isp: geoData.connection?.isp,
      org: geoData.connection?.org,
      asn: geoData.connection?.asn?.toString(),
      connection_type: geoData.connection?.type,
    };
    
    // Save the IP lookup to database for history logging
    try {
      await storage.saveIpLookup(ipInfo);
    } catch (dbError) {
      console.error("Failed to save IP lookup to database:", dbError);
      // Continue execution even if database save fails
    }
    
    res.json(ipInfo);
  } catch (error) {
    console.error("Error looking up IP:", error);
    res.status(500).json({ error: "Failed to lookup IP information" });
  }
}