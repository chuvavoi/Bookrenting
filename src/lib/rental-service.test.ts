import { beforeEach, describe, expect, it } from 'vitest';
import {
  isRentalValid,
  getUserRental,
  checkBookAccess,
  createRental,
  updateRentalStatus,
  getUserRentals,
  cancelRental,
  calculateRentalDays,
  formatDate,
  getMinimumEndDate,
} from './rental-service';
import type { BookContent, Rental } from './types';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

if (typeof globalThis.localStorage === 'undefined') {
  (globalThis as any).localStorage = localStorageMock;
}

beforeEach(() => {
  localStorage.clear();
});

const mockBook: BookContent = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  category: 'Test',
  cover: 'from-red-700 to-red-900',
  accent: 'oklch(0.55 0.16 50)',
  rating: 4.5,
  pages: 100,
  year: 2024,
  description: 'Test description',
  available: 5,
  excerpt: 'Test excerpt',
  preface: 'Test preface',
  tableOfContents: 'Test TOC',
  fullContent: 'Full content here...',
};

describe('Rental Service', () => {
  describe('Core Functionality', () => {
    it('isRentalValid returns true for active rental', () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const rental: Rental = {
        id: '1',
        userId: 'user1',
        bookId: '1',
        startDate: today,
        endDate: tomorrow,
        status: 'active',
        createdAt: today,
      };

      expect(isRentalValid(rental)).toBe(true);
    });

    it('isRentalValid returns false for expired rental', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const rental: Rental = {
        id: '1',
        userId: 'user1',
        bookId: '1',
        startDate: yesterday,
        endDate: yesterday,
        status: 'expired',
        createdAt: today,
      };

      expect(isRentalValid(rental)).toBe(false);
    });

    it('createRental creates new rental successfully', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const rental = createRental('user1', '1', tomorrow);

      expect(rental).toBeDefined();
      expect(rental.userId).toBe('user1');
      expect(getUserRental('user1', '1')).not.toBeNull();
    });

    it('checkBookAccess denies access without rental', () => {
      const access = checkBookAccess('user1', mockBook);

      expect(access.hasAccess).toBe(false);
      expect(access.content.fullContent).toBeNull();
    });

    it('checkBookAccess grants access with valid rental', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);
      const access = checkBookAccess('user1', mockBook);

      expect(access.hasAccess).toBe(true);
      expect(access.content.fullContent).toBeDefined();
    });
  });

  describe('Security Tests', () => {
    it('Full content never exposed without rental', () => {
      const access = checkBookAccess('user1', mockBook);
      expect(access.content.fullContent).toBeNull();
    });

    it('Different users have separate access', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);

      const user1Access = checkBookAccess('user1', mockBook);
      const user2Access = checkBookAccess('user2', mockBook);

      expect(user1Access.hasAccess).toBe(true);
      expect(user2Access.hasAccess).toBe(false);
    });

    it('Free content always accessible', () => {
      const access = checkBookAccess('user1', mockBook);

      expect(access.content.preface).toBeDefined();
      expect(access.content.tableOfContents).toBeDefined();
    });
  });

  describe('Rental Management', () => {
    it('getUserRentals returns all user rentals', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);
      createRental('user1', '2', tomorrow);
      const rentals = getUserRentals('user1');

      expect(rentals).toHaveLength(2);
    });

    it('cancelRental removes rental', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const rental = createRental('user1', '1', tomorrow);
      cancelRental(rental.id);

      const remainingRentals = getUserRentals('user1');
      expect(remainingRentals).toHaveLength(0);
    });

    it('calculateRentalDays returns correct days', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-08');
      const days = calculateRentalDays(start, end);
      expect(days).toBe(7);
    });
  });

  describe('Error Handling', () => {
    it('Throws error for past end date', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      expect(() => createRental('user1', '1', yesterday)).toThrow('End date must be after today');
    });

    it('Throws error for duplicate rental', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);

      expect(() => createRental('user1', '1', tomorrow)).toThrow('User already has an active rental');
    });
  });
});

