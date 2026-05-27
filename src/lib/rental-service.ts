import type { Rental, BookAccessPayload, BookContent, RentalStatus } from './types';

const RENTAL_KEY = 'tramsach.rentals';
const USER_ID = 'user_demo'; // Demo user ID

// Helper: Get current user ID (in real app, from auth context)
export function getCurrentUserId(): string {
  return USER_ID;
}

// Helper: Generate unique ID
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if a rental is still valid (within the rental period)
 * This is the CORE security function
 */
export function isRentalValid(rental: Rental): boolean {
  const now = new Date();
  return now >= rental.startDate && now <= rental.endDate;
}

/**
 * Get all rentals from localStorage
 */
function getAllRentals(): Rental[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(RENTAL_KEY);
    if (!data) return [];
    const rentals = JSON.parse(data) as Array<{
      id: string;
      userId: string;
      bookId: string;
      startDate: string;
      endDate: string;
      status: RentalStatus;
      createdAt: string;
    }>;
    return rentals.map((r) => ({
      ...r,
      startDate: new Date(r.startDate),
      endDate: new Date(r.endDate),
      createdAt: new Date(r.createdAt),
    }));
  } catch {
    return [];
  }
}

/**
 * Save rentals to localStorage
 */
function saveRentals(rentals: Rental[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(RENTAL_KEY, JSON.stringify(rentals));
}

/**
 * Get user's active rental for a book (if any)
 */
export function getUserRental(userId: string, bookId: string): Rental | null {
  const rentals = getAllRentals();
  const rental = rentals.find((r) => r.userId === userId && r.bookId === bookId);

  if (!rental) return null;
  if (!isRentalValid(rental)) {
    // Mark as expired
    updateRentalStatus(rental.id, 'expired');
    return null;
  }

  return rental;
}

/**
 * Determine what content the user can access
 */
export function checkBookAccess(
  userId: string,
  book: BookContent
): BookAccessPayload {
  const rental = getUserRental(userId, book.id);
  const hasActiveRental = rental !== null;

  return {
    bookId: book.id,
    hasAccess: hasActiveRental,
    rentalInfo: hasActiveRental
      ? {
          startDate: rental.startDate,
          endDate: rental.endDate,
          daysRemaining: Math.ceil(
            (rental.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          ),
        }
      : undefined,
    content: {
      preface: book.preface,
      tableOfContents: book.tableOfContents,
      fullContent: hasActiveRental ? book.fullContent : null, // ⭐ Key: only if rental is valid
    },
  };
}

/**
 * Create a new rental record
 */
export function createRental(userId: string, bookId: string, endDate: Date): Rental {
  const startDate = new Date();

  if (endDate <= startDate) {
    throw new Error('End date must be after today');
  }

  // Check for existing rental
  const existing = getUserRental(userId, bookId);
  if (existing) {
    throw new Error('User already has an active rental for this book');
  }

  const rental: Rental = {
    id: generateId(),
    userId,
    bookId,
    startDate,
    endDate,
    status: 'active',
    createdAt: new Date(),
  };

  const rentals = getAllRentals();
  rentals.push(rental);
  saveRentals(rentals);

  return rental;
}

/**
 * Update rental status
 */
export function updateRentalStatus(rentalId: string, status: RentalStatus): void {
  const rentals = getAllRentals();
  const rental = rentals.find((r) => r.id === rentalId);

  if (rental) {
    rental.status = status;
    saveRentals(rentals);
  }
}

/**
 * Get all rentals for a user
 */
export function getUserRentals(userId: string): Rental[] {
  const rentals = getAllRentals();
  return rentals.filter((r) => r.userId === userId);
}

/**
 * Cancel an active rental
 */
export function cancelRental(rentalId: string): void {
  const rentals = getAllRentals();
  const rentalIndex = rentals.findIndex((r) => r.id === rentalId);

  if (rentalIndex !== -1) {
    rentals.splice(rentalIndex, 1);
    saveRentals(rentals);
  }
}

/**
 * Calculate rental duration in days
 */
export function calculateRentalDays(startDate: Date, endDate: Date): number {
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Get minimum end date (tomorrow)
 */
export function getMinimumEndDate(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}
