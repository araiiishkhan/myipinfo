import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// IP Information schema
export const ipInfoSchema = z.object({
  ip: z.string(),
  hostname: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  country_code: z.string().optional(),
  loc: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  postal: z.string().optional(),
  timezone: z.string().optional(),
  isp: z.string().optional(),
  org: z.string().optional(),
  asn: z.string().optional(),
  connection_type: z.string().optional(),
});

export type IPInfo = z.infer<typeof ipInfoSchema>;

// DNS Lookup result schema
export const dnsLookupSchema = z.object({
  domain: z.string(),
  type: z.enum(["A", "AAAA", "CNAME", "MX", "TXT", "NS"]),
  results: z.array(z.string())
});

export type DNSLookupResult = z.infer<typeof dnsLookupSchema>;

// IP Lookup History
export const ipLookupHistory = pgTable("ip_lookup_history", {
  id: serial("id").primaryKey(),
  ip: text("ip").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  city: text("city"),
  region: text("region"),
  country: text("country"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  isp: text("isp"),
  asn: text("asn"),
});

export const insertIpLookupHistorySchema = createInsertSchema(ipLookupHistory).omit({
  id: true,
  timestamp: true,
});

export type InsertIpLookupHistory = z.infer<typeof insertIpLookupHistorySchema>;
export type IpLookupHistory = typeof ipLookupHistory.$inferSelect;
