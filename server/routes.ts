import type { Express } from "express";
import { createServer, type Server } from "http";
import { registerGetRoutes } from "../get only/index";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register all GET routes
  registerGetRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
