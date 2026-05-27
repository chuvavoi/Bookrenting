import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useFavorites } from "@/lib/favorites";
import { books } from "@/data/books";
import { BookOpen, Clock, Heart, Mail } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { ids } = useFavorites();
  const borrowing = books.slice(0, 2);

  const stats = [
    { label: "Đang mượn", value: borrowing.length, icon: BookOpen },
    { label: "Yêu thích", value: ids.length, icon: Heart },
    { label: "Đã đọc", value: 24, icon: Clock },
  ];

  return (
    <Layout>
      <section className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex items-center gap-5">
          <div className="size-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-serif text-3xl shadow-[var(--shadow-card)]">
            L
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl">Linh Nguyễn</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Mail className="size-3.5" /> linh.nguyen@email.com
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl bg-card border border-border p-5 shadow-[var(--shadow-card)]"
              >
                <Icon className="size-5 text-accent" />
                <div className="mt-3 text-3xl font-serif">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        <h2 className="font-serif text-2xl mt-12 mb-4">Đang mượn</h2>
        <div className="space-y-3">
          {borrowing.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <div
                className={`size-14 rounded-md bg-gradient-to-br ${b.cover} flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{b.title}</div>
                <div className="text-sm text-muted-foreground">{b.author}</div>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                Trả trước
                <br />
                <span className="text-foreground font-medium">28/05/2026</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
