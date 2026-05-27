import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, Heart, Star, Users } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { getBookById, books } from "@/data/books";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useFavorites } from "@/lib/favorites";
import { BookCard } from "@/components/BookCard";
import { RentalDialog } from "@/components/RentalDialog";
import { BookContentView } from "@/components/BookContentView";
import { checkBookAccess, getCurrentUserId } from "@/lib/rental-service";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$bookId")({
  component: BookDetail,
  loader: ({ params }) => {
    const book = getBookById(params.bookId);
    if (!book) throw notFound();
    return book;
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-4xl">Không tìm thấy sách</h1>
        <Button asChild className="mt-6">
          <Link to="/catalog">Về danh mục</Link>
        </Button>
      </div>
    </Layout>
  ),
});

function BookDetail() {
  const book = Route.useLoaderData();
  const { toggle, has } = useFavorites();
  const fav = has(book.id);
  const related = books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4);
  const [isRentalDialogOpen, setIsRentalDialogOpen] = useState(false);
  const [, setRefreshTrigger] = useState(0);

  // Get current access info
  const userId = getCurrentUserId();
  const access = checkBookAccess(userId, book);

  const handleRentalSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    toast.success("✅ Thuê sách thành công!", {
      description: `Bạn có thể đọc "${book.title}" cho đến ${new Date(access.rentalInfo?.endDate || new Date()).toLocaleDateString('vi-VN')}`,
    });
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 py-10">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Quay lại danh mục
        </Link>

        <div className="mt-8 grid md:grid-cols-[300px_1fr] gap-10">
          <div>
            <div
              className={`aspect-[2/3] rounded-2xl bg-gradient-to-br ${book.cover} shadow-[var(--shadow-book)] p-6 flex flex-col justify-between text-white`}
            >
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">
                  {book.category}
                </div>
                <h2 className="font-serif text-2xl mt-2">{book.title}</h2>
              </div>
              <div className="text-xs opacity-80">{book.author}</div>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-medium">
              {book.category}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mt-2 leading-tight">
              {book.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              bởi <span className="text-foreground">{book.author}</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" />
                <span className="font-medium">{book.rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="size-4" /> {book.pages} trang
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="size-4" /> {book.year}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="size-4" /> Còn {book.available} bản
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => setIsRentalDialogOpen(true)}
              >
                📖 Thuê để đọc toàn bộ
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  toggle(book.id);
                  toast(fav ? "Đã bỏ khỏi yêu thích" : "Đã thêm vào yêu thích");
                }}
              >
                <Heart className={`mr-1 size-4 ${fav ? "fill-primary text-primary" : ""}`} />
                {fav ? "Đã yêu thích" : "Yêu thích"}
              </Button>
            </div>

            <Tabs defaultValue="overview" className="mt-10">
              <TabsList>
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="excerpt">Đọc thử</TabsTrigger>
                <TabsTrigger value="details">Chi tiết</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6 text-muted-foreground leading-relaxed">
                {book.description}
              </TabsContent>
              <TabsContent value="excerpt" className="mt-6">
                <div className="rounded-xl bg-secondary/60 p-6 font-serif text-lg leading-relaxed italic">
                  "{book.excerpt}"
                </div>
              </TabsContent>
              <TabsContent value="details" className="mt-6">
                <dl className="grid grid-cols-2 gap-y-3 text-sm">
                  <dt className="text-muted-foreground">Tác giả</dt>
                  <dd>{book.author}</dd>
                  <dt className="text-muted-foreground">Thể loại</dt>
                  <dd>{book.category}</dd>
                  <dt className="text-muted-foreground">Số trang</dt>
                  <dd>{book.pages}</dd>
                  <dt className="text-muted-foreground">Năm xuất bản</dt>
                  <dd>{book.year}</dd>
                  <dt className="text-muted-foreground">Đánh giá</dt>
                  <dd>{book.rating}/5</dd>
                </dl>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Book Content View - Shows free content and rental gated content */}
        <div className="mt-16 pt-12 border-t">
          <BookContentView
            access={access}
            onRentClick={() => setIsRentalDialogOpen(true)}
          />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">Cùng thể loại</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Rental Dialog */}
      <RentalDialog
        isOpen={isRentalDialogOpen}
        onOpenChange={setIsRentalDialogOpen}
        bookId={book.id}
        bookTitle={book.title}
        onRentalSuccess={handleRentalSuccess}
      />
    </Layout>
  );
}
