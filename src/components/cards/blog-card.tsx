import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type BlogCardProps = {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
  };
};

export const BlogCard = ({ post }: BlogCardProps) => (
  <article className="rounded-lg border border-silver-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <p className="text-sm font-medium text-silver-500">
      {new Intl.DateTimeFormat('vi-VN').format(new Date(post.date))} ·{' '}
      {post.readTime}
    </p>
    <h3 className="mt-4 text-xl font-bold text-navy-950">{post.title}</h3>
    <p className="mt-3 text-sm leading-6 text-silver-500">{post.excerpt}</p>
    <Link
      href={`/tin-tuc#${post.slug}`}
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900"
    >
      Đọc bài viết
      <ArrowRight className="size-4" />
    </Link>
  </article>
);
