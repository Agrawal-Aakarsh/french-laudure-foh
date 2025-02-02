// src/types/types.ts

export interface Review {
  restaurant_name: string;
  date: string;
  rating: number;
  content: string;
}

export interface Order {
  item: string;
  dietary_tags: string[];
  price: number;
}

export interface Reservation {
  date: string;
  number_of_people: number;
  orders: Order[];
}

export interface Email {
  date: string;
  subject: string;
  combined_thread: string;
}

export interface Diner {
  name: string;
  reviews: Review[];
  reservations: Reservation[];
  emails: Email[];
}

export interface SpecialRequest {
  type: string;
  details: string;
  guestName: string;
}

export interface VIPInfo {
  isVip: boolean;
  reasons: string[];
  totalSpent: number;
  visitCount: number;
  name: string;
}

export interface EmailInfo {
  guestName: string;
  subject: string;
  content: string;
  type: "special_occasion" | "request" | "dietary" | "general";
  priority: "high" | "medium" | "low";
  needsAction: boolean;
}

export interface DailyStats {
  totalCovers: number;
  lunchCount: number;
  dinnerCount: number;
  specialOccasions: {
    type: string;
    count: number;
  }[];
  dietaryRestrictions: {
    type: string;
    count: number;
  }[];
  vipCount: number;
  returningGuestCount: number;
  specialRequests: SpecialRequest[];
}
