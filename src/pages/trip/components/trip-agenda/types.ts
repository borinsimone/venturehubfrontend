export interface Activity {
  id: string;
  title: string;
  type: 'flight' | 'hotel' | 'park' | 'hiking' | 'food' | 'other';
  time: string;
  details?: string;
  location?: string;
  from?: string;
  to?: string;
  completed?: boolean;
}

export interface Day {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Trip {
  id?: string;
  title?: string;
  destination: string;
  days: Day[];
  // altri campi che potrebbero essere presenti in activeTrip
}
