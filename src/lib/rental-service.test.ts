/**
 * Rental Service Test Suite
 * 
 * Run this test in Node.js environment or browser console
 * Tests the book rental system functionality
 */

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

// Test utilities
const tests: Array<{ name: string; fn: () => void | Promise<void> }> = [];
let passed = 0;
let failed = 0;

function describe(name: string, fn: () => void) {
  console.log(`\n📋 ${name}`);
  fn();
}

function it(description: string, fn: () => void | Promise<void>) {
  tests.push({ name: description, fn });
}

function expect<T>(value: T) {
  return {
    toBe: (expected: T) => {
      if (value === expected) {
        console.log(`  ✅ ${description}`);
        passed++;
      } else {
        console.log(`  ❌ ${description}`);
        console.log(`     Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(value)}`);
        failed++;
      }
    },
    toEqual: (expected: unknown) => {
      const match = JSON.stringify(value) === JSON.stringify(expected);
      if (match) {
        console.log(`  ✅ ${description}`);
        passed++;
      } else {
        console.log(`  ❌ ${description}`);
        console.log(`     Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(value)}`);
        failed++;
      }
    },
    toBeNull: () => {
      if (value === null) {
        console.log(`  ✅ ${description}`);
        passed++;
      } else {
        console.log(`  ❌ ${description}`);
        console.log(`     Expected null, Got: ${JSON.stringify(value)}`);
        failed++;
      }
    },
    toBeDefined: () => {
      if (value !== undefined && value !== null) {
        console.log(`  ✅ ${description}`);
        passed++;
      } else {
        console.log(`  ❌ ${description}`);
        console.log(`     Expected defined value, Got: ${JSON.stringify(value)}`);
        failed++;
      }
    },
    toThrow: (errorMessage?: string) => {
      try {
        (value as any)();
        console.log(`  ❌ ${description}`);
        console.log(`     Expected error to be thrown`);
        failed++;
      } catch (e) {
        if (errorMessage && !(e instanceof Error && e.message.includes(errorMessage))) {
          console.log(`  ❌ ${description}`);
          console.log(`     Expected error with message: "${errorMessage}", Got: "${(e as Error).message}"`);
          failed++;
        } else {
          console.log(`  ✅ ${description}`);
          passed++;
        }
      }
    },
    toHaveLength: (expectedLength: number) => {
      const length = (value as any).length;
      if (length === expectedLength) {
        console.log(`  ✅ ${description}`);
        passed++;
      } else {
        console.log(`  ❌ ${description}`);
        console.log(`     Expected length: ${expectedLength}, Got: ${length}`);
        failed++;
      }
    },
    toBeGreaterThan: (num: number) => {
      if ((value as any) > num) {
        console.log(`  ✅ ${description}`);
        passed++;
      } else {
        console.log(`  ❌ ${description}`);
        console.log(`     Expected > ${num}, Got: ${value}`);
        failed++;
      }
    },
  };
}

let description = '';

// Mock localStorage
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

if (typeof window === 'undefined') {
  (global as any).localStorage = localStorageMock;
}

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

// ============ TESTS ============

describe('Rental Service Tests', () => {
  describe('Core Functionality', () => {
    description = 'isRentalValid returns true for active rental';
    it(description, () => {
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

    description = 'isRentalValid returns false for expired rental';
    it(description, () => {
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

    description = 'createRental creates new rental successfully';
    it(description, () => {
      localStorage.clear();
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const rental = createRental('user1', '1', tomorrow);

      expect(rental).toBeDefined();
      expect(rental.userId).toBe('user1');
    });

    description = 'checkBookAccess denies access without rental';
    it(description, () => {
      localStorage.clear();
      const access = checkBookAccess('user1', mockBook);

      expect(access.hasAccess).toBe(false);
      expect(access.content.fullContent).toBeNull();
    });

    description = 'checkBookAccess grants access with valid rental';
    it(description, () => {
      localStorage.clear();
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);
      const access = checkBookAccess('user1', mockBook);

      expect(access.hasAccess).toBe(true);
      expect(access.content.fullContent).toBeDefined();
    });
  });

  describe('Security Tests', () => {
    description = 'Full content never exposed without rental';
    it(description, () => {
      localStorage.clear();
      const access = checkBookAccess('user1', mockBook);
      expect(access.content.fullContent).toBeNull();
    });

    description = 'Different users have separate access';
    it(description, () => {
      localStorage.clear();
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);

      const user1Access = checkBookAccess('user1', mockBook);
      const user2Access = checkBookAccess('user2', mockBook);

      expect(user1Access.hasAccess).toBe(true);
      expect(user2Access.hasAccess).toBe(false);
    });

    description = 'Free content always accessible';
    it(description, () => {
      localStorage.clear();
      const access = checkBookAccess('user1', mockBook);

      expect(access.content.preface).toBeDefined();
      expect(access.content.tableOfContents).toBeDefined();
    });
  });

  describe('Rental Management', () => {
    description = 'getUserRentals returns all user rentals';
    it(description, () => {
      localStorage.clear();
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);
      createRental('user1', '2', tomorrow);
      const rentals = getUserRentals('user1');

      expect(rentals).toHaveLength(2);
    });

    description = 'cancelRental removes rental';
    it(description, () => {
      localStorage.clear();
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const rental = createRental('user1', '1', tomorrow);
      cancelRental(rental.id);

      const remainingRentals = getUserRentals('user1');
      expect(remainingRentals).toHaveLength(0);
    });

    description = 'calculateRentalDays returns correct days';
    it(description, () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-08');
      const days = calculateRentalDays(start, end);
      expect(days).toBe(7);
    });
  });

  describe('Error Handling', () => {
    description = 'Throws error for future end date';
    it(description, () => {
      localStorage.clear();
      expect(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        createRental('user1', '1', yesterday);
      }).toThrow('End date must be after today');
    });

    description = 'Throws error for duplicate rental';
    it(description, () => {
      localStorage.clear();
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      createRental('user1', '1', tomorrow);

      expect(() => {
        createRental('user1', '1', tomorrow);
      }).toThrow('User already has an active rental');
    });
  });
});

// Run all tests
console.log('\n🧪 Running Rental Service Tests...\n');
tests.forEach(test => {
  description = test.name;
  test.fn();
});

// Print summary
console.log(
  `\n${'='.repeat(50)}\n✅ Passed: ${passed}\n❌ Failed: ${failed}\nTotal: ${passed + failed}\n${'='.repeat(50)}`
);

if (failed === 0) {
  console.log('🎉 All tests passed!\n');
}

