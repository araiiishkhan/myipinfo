import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

import { db } from "./db";
import { eq } from "drizzle-orm";
import { ipLookupHistory, users } from "@shared/schema";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async saveIpLookup(ipData: any): Promise<void> {
    await db.insert(ipLookupHistory).values({
      ip: ipData.ip,
      city: ipData.city,
      region: ipData.region,
      country: ipData.country,
      latitude: ipData.latitude?.toString(),
      longitude: ipData.longitude?.toString(),
      isp: ipData.isp,
      asn: ipData.asn,
    });
  }
  
  async getRecentIpLookups(limit: number = 10): Promise<any[]> {
    return await db.select().from(ipLookupHistory).orderBy(ipLookupHistory.timestamp).limit(limit);
  }
}

export const storage = new DatabaseStorage();
