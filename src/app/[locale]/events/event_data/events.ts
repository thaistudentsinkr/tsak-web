export interface Sponsor {
  name: string;
  logoUrl: string;
}

export interface EventData {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  imageUrl: string;
  date: string;
  dateRange?: string;
  status: 'ended' | 'closed' | 'open';
  statusText: string;
  description?: string;
  descriptionEn?: string;
  location?: string;
  registrationUrl?: string;
  organizer?: string;
  organizerLogoUrl?: string;
  sponsors?: Sponsor[];
  imageDir?: string[];
}

