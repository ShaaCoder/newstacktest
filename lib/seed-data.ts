import connectDB from '@/lib/mongodb';
import BlogPost from './models/BlogPost';
import Query from './models/Query';

const samplePosts = [
  {
    title: 'Getting Started with Next.js 13',
    excerpt: 'Learn how to build modern web applications with Next.js 13 and the new App Router.',
    content: 'Next.js 13 introduces many exciting features including the new App Router, improved performance, and better developer experience. In this comprehensive guide, we\'ll explore how to get started with Next.js 13 and build your first application.',
    author: 'John Doe',
    category: 'web-development',
    tags: ['nextjs', 'react', 'javascript'],
    image_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'getting-started-with-nextjs-13',
    status: 'published' as const,
    meta_title: 'Getting Started with Next.js 13 - Complete Guide',
    meta_description: 'Learn Next.js 13 with our comprehensive guide covering App Router, performance improvements, and best practices.',
  },
  {
    title: 'Modern CSS Techniques for 2025',
    excerpt: 'Discover the latest CSS features and techniques that will revolutionize your web design.',
    content: 'CSS has evolved significantly over the years, and 2025 brings even more exciting features. From container queries to advanced grid layouts, learn how to leverage these powerful tools.',
    author: 'Jane Smith',
    category: 'ui-ux-design',
    tags: ['css', 'design', 'frontend'],
    image_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'modern-css-techniques-2025',
    status: 'published' as const,
    meta_title: 'Modern CSS Techniques for 2025 - Latest Features',
    meta_description: 'Discover cutting-edge CSS techniques and features for 2025 to create stunning web designs.',
  },
  {
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Best practices for creating robust and scalable API endpoints using Node.js and Express.',
    content: 'When building APIs at scale, there are many considerations to keep in mind. This guide covers best practices for Node.js API development.',
    author: 'Mike Johnson',
    category: 'web-development',
    tags: ['nodejs', 'api', 'backend'],
    image_url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'building-scalable-apis-nodejs',
    status: 'published' as const,
  },
];

const sampleQueries = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    company: 'TechStart Inc.',
    message: 'We are looking for a team to develop our e-commerce platform. Could you provide a quote for a full-stack solution with payment integration?',
    status: 'new' as const,
  },
  {
    name: 'Bob Smith',
    email: 'bob@startup.co',
    company: 'Startup Co.',
    message: 'Hi, we need help with optimizing our website performance. Our current site is loading slowly and we\'d like to improve user experience.',
    status: 'in-progress' as const,
  },
];

export async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await BlogPost.deleteMany({});
    await Query.deleteMany({});

    // Insert sample data
    await BlogPost.insertMany(samplePosts);
    await Query.insertMany(sampleQueries);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Uncomment the line below to run the seed function
// seedDatabase();