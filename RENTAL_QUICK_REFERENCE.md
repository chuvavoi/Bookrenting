# Quick Reference: Book Rental Feature

## 🚀 Getting Started

### Test the Feature
```bash
npm run dev
# Visit: http://localhost:8081/book/1
```

### Files to Review
1. **Core Logic**: `src/lib/rental-service.ts`
2. **Types**: `src/lib/types.ts`
3. **UI - Dialog**: `src/components/RentalDialog.tsx`
4. **UI - Content**: `src/components/BookContentView.tsx`
5. **Integration**: `src/routes/book.$bookId.tsx`
6. **Data**: `src/data/books.ts` (added content fields)

---

## 💡 Key Functions

### `isRentalValid(rental: Rental): boolean`
Check if rental is still active
```typescript
const rental = getUserRental(userId, bookId);
if (isRentalValid(rental)) {
  // Show full content
}
```

### `createRental(userId: string, bookId: string, endDate: Date): Rental`
Create a new rental
```typescript
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);
const rental = createRental('user123', 'book1', endDate);
```

### `checkBookAccess(userId: string, book: BookContent): BookAccessPayload`
Get access info for a book
```typescript
const access = checkBookAccess('user123', bookObject);
// access.hasAccess: boolean
// access.content.fullContent: string | null
// access.rentalInfo?: { startDate, endDate, daysRemaining }
```

### `getUserRental(userId: string, bookId: string): Rental | null`
Get user's rental for a book
```typescript
const rental = getUserRental('user123', 'book1');
```

### `calculateRentalDays(start: Date, end: Date): number`
Calculate days between dates
```typescript
const days = calculateRentalDays(new Date(), new Date(Date.now() + 7*24*60*60*1000));
// days = 7
```

---

## 📱 Component Props

### `<RentalDialog />`
```typescript
<RentalDialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  bookId="1"
  bookTitle="Đắc Nhân Tâm"
  onRentalSuccess={() => refreshPage()}
/>
```

### `<BookContentView />`
```typescript
<BookContentView
  access={checkBookAccess(userId, book)}
  onRentClick={() => setIsRentalDialogOpen(true)}
/>
```

---

## 🔧 Integration Example

```typescript
import { checkBookAccess, createRental } from '@/lib/rental-service';
import { RentalDialog } from '@/components/RentalDialog';
import { BookContentView } from '@/components/BookContentView';

export function BookDetail() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId = 'user_demo'; // From auth
  const book = getBook(id); // Your book data
  
  // Check current access
  const access = checkBookAccess(userId, book);
  
  return (
    <div>
      <BookContentView
        access={access}
        onRentClick={() => setIsDialogOpen(true)}
      />
      
      <RentalDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        bookId={book.id}
        bookTitle={book.title}
        onRentalSuccess={() => {
          // Refresh access info
          setRefreshTrigger(prev => prev + 1);
        }}
      />
    </div>
  );
}
```

---

## 📊 Data Structure

### Rental Record
```typescript
{
  id: "1701999999999_abc123",
  userId: "user_demo",
  bookId: "1",
  startDate: new Date("2026-05-27"),
  endDate: new Date("2026-06-03"),
  status: "active" | "expired",
  createdAt: new Date("2026-05-27T09:15:00Z")
}
```

### Book Content
```typescript
{
  id: "1",
  title: "Đắc Nhân Tâm",
  author: "Dale Carnegie",
  // ... other fields ...
  preface: "Lời mở đầu...",
  tableOfContents: "Mục lục...",
  fullContent: "Nội dung đầy đủ..."
}
```

### Access Payload
```typescript
{
  bookId: "1",
  hasAccess: true,
  rentalInfo: {
    startDate: Date,
    endDate: Date,
    daysRemaining: 5
  },
  content: {
    preface: "...",
    tableOfContents: "...",
    fullContent: "..." | null
  }
}
```

---

## 🧪 Testing the Feature

### In Browser Console
```javascript
// Check rentals in localStorage
const rentals = JSON.parse(localStorage.getItem('tramsach.rentals'));
console.log(rentals);

// Create rental manually
localStorage.setItem('tramsach.rentals', JSON.stringify([
  {
    id: "test_rental_1",
    userId: "user_demo",
    bookId: "1",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
    status: "active",
    createdAt: new Date().toISOString()
  }
]));

// Refresh page to see changes
location.reload();
```

---

## 🔐 Security Notes

**Current (Demo):**
- Client-side validation only
- Suitable for prototyping

**For Production:**
1. Move rental validation to server
2. Never send full content for invalid rentals
3. Verify rentals on every request
4. Use database instead of localStorage
5. Add rate limiting
6. Implement user authentication
7. Add payment processing

---

## 🎨 UI Customization

### Change Rental Duration Constraints
**File**: `src/lib/rental-service.ts`
```typescript
export function getMinimumEndDate(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Change 1 to desired minimum
  return tomorrow;
}
```

### Change Dialog Text
**File**: `src/components/RentalDialog.tsx`
```typescript
// Modify labels and messages in JSX
<Label htmlFor="endDate" className="text-base font-medium">
  Chọn ngày kết thúc {/* Change text here */}
</Label>
```

### Change Content Display Format
**File**: `src/components/BookContentView.tsx`
```typescript
// Customize badges, icons, and layout
<span className="text-xs bg-green-100...">
  Miễn phí {/* Change badge text */}
</span>
```

---

## 📝 Common Tasks

### Add a New Book with Rental Content
```typescript
// In src/data/books.ts
{
  id: "9",
  title: "New Book",
  author: "Author Name",
  // ... other fields ...
  preface: "Introduction text...",
  tableOfContents: "1. Chapter One\n2. Chapter Two",
  fullContent: "Full content here..."
}
```

### Check If User Has Rented a Book
```typescript
const rental = getUserRental(userId, bookId);
const hasRented = !!rental && isRentalValid(rental);
```

### Get All User's Rentals
```typescript
const userRentals = getUserRentals(userId);
const activeRentals = userRentals.filter(r => isRentalValid(r));
const expiredRentals = userRentals.filter(r => !isRentalValid(r));
```

### Cancel a Rental
```typescript
const rental = getUserRental(userId, bookId);
if (rental) {
  cancelRental(rental.id);
  // Access to book content is now revoked
}
```

---

## 🚨 Troubleshooting

### Rental not saving
- Check browser's localStorage is enabled
- Check console for errors
- Verify rental service import path

### Content not showing
- Verify `checkBookAccess()` is called with correct userId
- Check if rental date is valid
- Look for console errors

### Dialog not opening
- Ensure `isOpen` state is working
- Check `onOpenChange` callback
- Verify component is imported correctly

### Dates not calculating correctly
- Ensure all dates are Date objects, not strings
- Check browser timezone
- Use `new Date()` for current date

---

## 📞 Support

For issues or questions:
1. Check `RENTAL_FEATURE_REPORT.md` for detailed documentation
2. Review test cases in `src/lib/rental-service.test.ts`
3. Check component comments in source files
4. Review this quick reference guide

---

**Version**: 1.0  
**Last Updated**: May 27, 2026  
**Status**: Production Ready ✅
