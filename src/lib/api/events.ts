export interface Sponsor {
  name: string;
  logoUrl: string;
}

export interface EventData {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  imageUrl: string;
  date: string;
  dateRange?: string;
  status: 'ended' | 'closed' | 'open';
  statusText: string;
  description?: string;
  location?: string;
  organizer?: string;
  sponsors?: Sponsor[];
  imageDir?: string[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Fetch all events from the backend API
 */
export async function fetchEvents(): Promise<EventData[]> {
  const res = await fetch(`${API_BASE_URL}/api/events/`);
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
}

/**
 * Fetch a single event by ID from the backend API
 */
export async function fetchEventById(eventId: string): Promise<EventData> {
  const res = await fetch(`${API_BASE_URL}/api/events/${eventId}/`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Event not found");
    }
    throw new Error("Failed to fetch event");
  }
  return res.json();
}

