import { Request, Response } from "express";
import { storage } from "../server/storage";

// GET /api/history - Get recent IP lookup history
export async function getHistory(req: Request, res: Response): Promise<void> {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    
    if (isNaN(limit) || limit < 1 || limit > 100) {
      res.status(400).json({ error: "Invalid limit parameter. Must be between 1 and 100." });
      return;
    }
    
    const history = await storage.getRecentIpLookups(limit);
    res.json(history);
  } catch (error) {
    console.error("Error fetching IP lookup history:", error);
    res.status(500).json({ error: "Failed to fetch IP lookup history" });
  }
}