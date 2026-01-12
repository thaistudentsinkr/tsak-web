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

