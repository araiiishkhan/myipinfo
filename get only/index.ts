import { Express } from "express";
import { getIpInfo } from './ip-info';
import { ipLookup } from './ip-lookup';
import { dnsLookup } from './dns-lookup';
import { getHistory } from './history';

// Register all GET routes
export function registerGetRoutes(app: Express): boolean {
  // Get user's IP information
  app.get("/api/ip-info", getIpInfo);
  
  // IP Lookup tool
  app.get("/api/ip-lookup", ipLookup);
  
  // DNS Lookup tool
  app.get("/api/dns-lookup", dnsLookup);
  
  // Get IP lookup history
  app.get("/api/history", getHistory);
  
  return true;
}