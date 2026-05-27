import { Button } from '@/components/ui/button';
import { AlertCircle, BookOpen, Lock, CheckCircle } from 'lucide-react';
import type { BookAccessPayload } from '@/lib/types';
import { formatDate } from '@/lib/rental-service';

interface BookContentViewProps {
  access: BookAccessPayload;
  onRentClick: () => void;
}

export function BookContentView({ access, onRentClick }: BookContentViewProps) {
  return (
    <div className="space-y-8">
      {/* Preface - Always Free */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h2 className="text-2xl font-serif font-semibold">Lời mở đầu</h2>
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
            Miễn phí
          </span>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {access.content.preface}
          </p>
        </div>
      </section>

      {/* Table of Contents - Always Free */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h2 className="text-2xl font-serif font-semibold">Mục lục</h2>
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
            Miễn phí
          </span>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed font-mono text-sm bg-muted p-4 rounded-lg">
            {access.content.tableOfContents}
          </div>
        </div>
      </section>

      {/* Full Content - Requires Rental */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-serif font-semibold">Nội dung đầy đủ</h2>
          {access.hasAccess ? (
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="size-3" /> Đã mở khóa
            </span>
          ) : (
            <span className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full flex items-center gap-1">
              <Lock className="size-3" /> Yêu cầu thuê
            </span>
          )}
        </div>

        {access.hasAccess ? (
          <>
            {/* Rental Active */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    ✅ Bạn có quyền truy cập
                  </p>
                  <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <p>
                      <strong>Ngày bắt đầu:</strong>{' '}
                      {formatDate(access.rentalInfo!.startDate)}
                    </p>
                    <p>
                      <strong>Ngày kết thúc:</strong>{' '}
                      {formatDate(access.rentalInfo!.endDate)}
                    </p>
                    <p>
                      <strong className="text-lg">Còn lại:</strong>{' '}
                      <span className="text-lg font-bold">
                        {access.rentalInfo!.daysRemaining} ngày
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Content Display */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                {access.content.fullContent}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Rental Locked */}
            <div className="bg-gray-50 dark:bg-gray-950 border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 rounded-lg text-center">
              <Lock className="size-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Nội dung này bị khóa
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Hãy thuê sách để đọc nội dung đầy đủ. Bạn có thể tùy chọn thời gian thuê dài hay
                ngắn tùy theo nhu cầu của bạn.
              </p>

              {/* Why Rent Benefits */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6 text-left space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📖</span>
                  <div>
                    <p className="font-medium">Đọc toàn bộ nội dung</p>
                    <p className="text-sm text-muted-foreground">Truy cập đầy đủ sách trong khoảng thời gian thuê</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="font-medium">Linh hoạt thời gian</p>
                    <p className="text-sm text-muted-foreground">Chọn thời hạn phù hợp với bạn</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-medium">Chi phí tiết kiệm</p>
                    <p className="text-sm text-muted-foreground">Thuê rẻ hơn mua sách</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={onRentClick}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Thuê ngay để mở khóa
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
