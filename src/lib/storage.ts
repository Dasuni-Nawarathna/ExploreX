import fs from "fs";
import path from "path";
import { SiteSettings, StoredEnquiry } from "@/types";
import { defaultSettings } from "@/data/settings";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

function ensureDirectoryExistence() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getSiteSettings(): SiteSettings {
  try {
    ensureDirectoryExistence();
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, "utf-8");
      return { ...defaultSettings, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error("Failed to read settings file:", err);
  }
  return defaultSettings;
}

export function saveSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  ensureDirectoryExistence();
  const current = getSiteSettings();
  const updated = { ...current, ...settings };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

export function getEnquiries(): StoredEnquiry[] {
  try {
    ensureDirectoryExistence();
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const data = fs.readFileSync(ENQUIRIES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read enquiries file:", err);
  }
  return [];
}

export function saveEnquiry(enquiry: Omit<StoredEnquiry, "id" | "timestamp" | "status">): StoredEnquiry {
  ensureDirectoryExistence();
  const list = getEnquiries();
  const newEnquiry: StoredEnquiry = {
    ...enquiry,
    id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    status: "new"
  };
  list.unshift(newEnquiry); // newest first
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newEnquiry;
}

