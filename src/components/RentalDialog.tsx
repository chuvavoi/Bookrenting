import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, AlertCircle } from 'lucide-react';
import {
  createRental,
  getMinimumEndDate,
  calculateRentalDays,
  formatDate,
} from '@/lib/rental-service';

interface RentalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string;
  bookTitle: string;
  onRentalSuccess: () => void;
}

export function RentalDialog({
  isOpen,
  onOpenChange,
  bookId,
  bookTitle,
  onRentalSuccess,
}: RentalDialogProps) {
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const minEndDate = getMinimumEndDate();
  const minDateString = minEndDate.toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const daysRemaining = selectedEndDate
    ? calculateRentalDays(new Date(), new Date(selectedEndDate))
    : 0;

  const handleRent = async () => {
    if (!selectedEndDate) {
      setError('Vui lòng chọn ngày kết thúc');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const endDate = new Date(selectedEndDate);
      createRental('user_demo', bookId, endDate);

      // Reset form
      setSelectedEndDate('');
      onOpenChange(false);
      onRentalSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thuê sách: {bookTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Date Display */}
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Ngày bắt đầu (Hôm nay)</p>
                <p className="text-lg font-semibold">{formatDate(new Date())}</p>
              </div>
            </div>
          </div>

          {/* End Date Selector */}
          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-base font-medium">
              Chọn ngày kết thúc
            </Label>
            <div className="relative">
              <input
                id="endDate"
                type="date"
                min={minDateString}
                value={selectedEndDate}
                onChange={(e) => {
                  setSelectedEndDate(e.target.value);
                  setError(null);
                }}
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Tối thiểu: {formatDate(minEndDate)}
            </p>
          </div>

          {/* Rental Duration Preview */}
          {selectedEndDate && (
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="space-y-2">
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  Thời gian thuê
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Ngày kết thúc:</p>
                  <p className="font-semibold">{formatDate(new Date(selectedEndDate))}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Số ngày:</p>
                  <p className="font-semibold text-lg text-green-600 dark:text-green-400">
                    {daysRemaining} ngày
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800 dark:text-red-100">{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-900 dark:text-amber-100">
              💡 <strong>Lưu ý:</strong> Bạn có thể đọc nội dung đầy đủ trong khoảng thời gian
              này. Sau khi hết hạn, bạn chỉ có thể xem Lời mở đầu và Mục lục.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleRent}
            disabled={!selectedEndDate || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? 'Đang xử lý...' : 'Thuê ngay'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
