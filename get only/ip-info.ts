import { Request, Response } from "express";
import { storage } from "../server/storage";

// GET /api/ip-info - Get user's IP information
export async function getIpInfo(req: Request, res: Response): Promise<void> {
  try {
    // Get the client IP from headers or socket
    const clientIp = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '';
    const ip = clientIp.includes(',') ? clientIp.split(',')[0].trim() : clientIp.trim();
    
    // Use a combination of free API services, starting with ipwhois.app which has generous rate limits
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
    console.error("Error fetching IP info:", error);
    res.status(500).json({ error: "Failed to fetch IP information" });
  }
}