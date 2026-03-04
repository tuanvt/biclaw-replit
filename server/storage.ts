import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  leads, chatSessions, chatMessages,
  type Lead, type InsertLead,
  type ChatSession, type ChatMessage, type InsertChatMessage
} from "@shared/schema";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadByEmail(email: string): Promise<Lead | undefined>;
  createChatSession(): Promise<ChatSession>;
  getChatSession(id: string): Promise<ChatSession | undefined>;
  addMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getMessages(sessionId: string): Promise<ChatMessage[]>;
}

const db = drizzle(process.env.DATABASE_URL!);

export class DatabaseStorage implements IStorage {
  async createLead(lead: InsertLead): Promise<Lead> {
    const [created] = await db.insert(leads).values(lead).returning();
    return created;
  }

  async getLeadByEmail(email: string): Promise<Lead | undefined> {
    const [found] = await db.select().from(leads).where(eq(leads.email, email));
    return found;
  }

  async createChatSession(): Promise<ChatSession> {
    const [session] = await db.insert(chatSessions).values({}).returning();
    return session;
  }

  async getChatSession(id: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session;
  }

  async addMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [created] = await db.insert(chatMessages).values(message).returning();
    return created;
  }

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    return db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId));
  }
}

export const storage = new DatabaseStorage();
