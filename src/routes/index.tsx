import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-library.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = books.slice(0, 4);
  const newArrivals = books.slice(4, 8);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Thư viện ấm cúng"
            width={1536}
            height={1024}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-36 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
            <Sparkles className="size-3.5" /> Hơn 1.200 đầu sách đang chờ bạn
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
            Mỗi cuốn sách
            <br />
            là một chuyến đi.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Thuê và mượn sách trực tuyến với chi phí thấp nhất. Giao tận nhà,
            đổi sách miễn phí mỗi tuần.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/catalog">
                Khám phá thư viện <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/catalog">
                <Search className="mr-1 size-4" /> Tìm sách
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-medium">
              Nổi bật
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">
              Được mượn nhiều nhất tuần
            </h2>
          </div>
          <Link
            to="/catalog"
            className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Xem tất cả <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest text-accent font-medium">
              Mới về kệ
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">
              Vừa cập bến Trạm Sách
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
