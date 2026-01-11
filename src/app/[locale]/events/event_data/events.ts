export interface EventData {
  id: string;
  title: string;
  titleEn?: string;
  imageUrl: string;
  date: string;
  dateRange?: string;
  status: 'ended' | 'closed' | 'open';
  statusText: string;
  description?: string;
  location?: string;
  organizer?: string;
}

export const events: EventData[] = [
  {
    id: '2025001',
    title: 'งานแรกพบ 2025',
    titleEn: 'First Meeting 2025',
    imageUrl: '/events/event_data/images/first-meeting-2025.jpg',
    date: '20.07.2025 - 23.07.2025',
    status: 'ended',
    statusText: 'สิ้นสุดแล้ว',
    description: 'Get to know TSAK, Meet new friends, Play fun games, Make new special memories, Find Thai dishes',
    location: 'Bangkok University of Foreign Studies',
    organizer: 'TSAK'
  },
  {
    id: '2025002',
    title: 'Thai Town',
    titleEn: 'Thai Town',
    imageUrl: '/events/event_data/images/thai-town.jpg',
    date: '20.07.2025 ~ 23.07.2025',
    status: 'closed',
    statusText: 'ปิดรับสมัคร',
    description: 'Thai Market Live Music',
    location: '@Haebangchon 해방촌 신흥시장',
    organizer: 'TSAK'
  },
  {
    id: '2025003',
    title: 'งานแรกพบ',
    titleEn: 'First Meeting',
    imageUrl: '/events/event_data/images/first-meeting.jpg',
    date: '20.07.2025 - 23.07.2025',
    status: 'open',
    statusText: 'เปิดรับสมัคร',
    description: 'D-02',
    location: 'TBA',
    organizer: 'TSAK'
  },
  {
    id: '2025004',
    title: 'ตัวอย่างงานที่ 4',
    titleEn: 'First Meeting',
    imageUrl: '/events/event_data/images/first-meeting.jpg',
    date: '20.07.2025 - 23.07.2025',
    status: 'open',
    statusText: 'เปิดรับสมัคร',
    description: 'D-02',
    location: 'TBA',
    organizer: 'TSAK'
  }
];
