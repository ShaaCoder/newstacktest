import { BlogList } from '@/components/blog/blog-list';
import { BlogSearch } from '@/components/blog/blog-search';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata = {
  title: 'Blog - DevForge',
  description: 'Insights, tutorials, and industry news from our web development experts.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends, tutorials, and insights from the world of web development.
            </p>
          </div>
          
          <BlogSearch />
          <BlogList />
        </div>
      </main>
      <Footer />
    </div>
  );
}