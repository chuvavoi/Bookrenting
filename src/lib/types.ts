// Rental Status Types
export type RentalStatus = 'active' | 'expired';

// User type (basic for now)
export type User = {
  id: string;
  email: string;
  full_name: string;
  created_at: Date;
};

// Book with content sections
export type BookContent = {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  accent: string;
  rating: number;
  pages: number;
  year: number;
  description: string;
  available: number;
  excerpt: string;
  // Content sections
  preface: string; // Free
  tableOfContents: string; // Free
  fullContent: string; // Requires rental
};

// Rental Record
export type Rental = {
  id: string;
  userId: string;
  bookId: string;
  startDate: Date; // Ngày bắt đầu (today)
  endDate: Date; // Ngày kết thúc (user selected)
  status: RentalStatus;
  createdAt: Date;
};

// What the client receives
export type BookAccessPayload = {
  bookId: string;
  hasAccess: boolean;
  rentalInfo?: {
    startDate: Date;
    endDate: Date;
    daysRemaining: number;
  };
  content: {
    preface: string;
    tableOfContents: string;
    fullContent: string | null; // null if no active rental
  };
};
