import {
  Code, Smartphone, ShoppingCart, Search,
  Zap, Shield, Brain, Bot, Share2,
} from 'lucide-react';

/** Convert “Custom Web Development” → “custom-web-development” */
export const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/ & /g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const services = [
  {
    icon: Code,
    title: 'Custom Web Development',
    shortDescription: 'Tailored apps built with React, Next.js, and Node.js.',
    extendedDescription:
      'We craft bespoke web applications designed to meet your unique business needs. Using modern frameworks like React, Next.js, and Node.js, we deliver scalable, high‑performance solutions that drive engagement and growth.',
    features: [
      'Custom UI/UX design tailored to your brand',
      'Server‑side rendering (SSR) and static site generation (SSG)',
      'Integration with APIs and third‑party services',
      'Scalable backend with Node.js and databases like MongoDB',
    ],
    benefits:
      'Launch a fast, responsive, and feature‑rich website that enhances user experience and supports your business goals.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    shortDescription: 'Robust native & cross‑platform apps.',
    extendedDescription:
      'Our mobile app development services deliver seamless, high‑quality applications for iOS and Android. Whether you need a native app or a cross‑platform solution using React Native, we ensure performance and usability.',
    features: [
      'Native and cross‑platform development with React Native',
      'Custom animations and intuitive interfaces',
      'Integration with Firebase, push notifications, and APIs',
      'App Store and Play Store deployment support',
    ],
    benefits:
      'Reach your audience on mobile with apps that are fast, reliable, and tailored to your business.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    shortDescription: 'Online stores with payments, analytics, CMS.',
    extendedDescription:
      'We build robust e‑commerce platforms that empower businesses to sell online efficiently. From product catalogs to secure payment gateways, our solutions include everything you need for a successful online store.',
    features: [
      'Custom storefronts with Shopify, WooCommerce, or Next.js Commerce',
      'Secure payment gateways (Stripe, PayPal, etc.)',
      'Advanced analytics and customer insights',
      'CMS for easy product and content management',
    ],
    benefits:
      'Increase sales with a user‑friendly, secure, and scalable e‑commerce platform tailored to your brand.',
  },
  {
    icon: Search,
    title: 'SEO & Digital Marketing',
    shortDescription: 'Rank high with SEO, SEM & performance audits.',
    extendedDescription:
      'Our SEO and digital marketing services help your business stand out online. We optimize your website, run targeted ad campaigns, and perform audits to boost visibility and conversions.',
    features: [
      'On‑page and technical SEO optimization',
      'Keyword research and content strategy',
      'Google Ads and social media ad campaigns',
      'Performance audits for Core Web Vitals',
    ],
    benefits:
      'Drive organic traffic and conversions with data‑driven strategies that improve your search rankings.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    shortDescription: 'Speed, caching & Core Web Vitals optimization.',
    extendedDescription:
      'We enhance your website’s performance to deliver lightning‑fast load times and a superior user experience.',
    features: [
      'Image optimization and lazy loading',
      'Advanced caching strategies (CDN, browser caching)',
      'Code splitting and bundle optimization',
      'Core Web Vitals improvements (LCP, FID, CLS)',
    ],
    benefits:
      'Keep users engaged with a fast, smooth website that ranks higher and converts better.',
  },
  {
    icon: Shield,
    title: 'Security & Maintenance',
    shortDescription: 'Regular updates, audits & uptime monitoring.',
    extendedDescription:
      'Protect your digital assets with our comprehensive security and maintenance services.',
    features: [
      'SSL/TLS setup and HTTPS enforcement',
      'Regular security audits and vulnerability scans',
      'Automated backups and disaster recovery',
      '24/7 uptime monitoring and support',
    ],
    benefits:
      'Gain peace of mind with a secure, reliable platform that’s always up‑to‑date and protected.',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    shortDescription: 'Add smart automation & AI‑driven features.',
    extendedDescription:
      'Incorporate artificial intelligence into your applications to automate processes and enhance user experiences.',
    features: [
      'Integration with AI APIs (OpenAI, TensorFlow, etc.)',
      'Personalized recommendation systems',
      'Predictive analytics and data insights',
      'Custom AI model development',
    ],
    benefits:
      'Leverage AI to automate tasks, personalize experiences, and gain a competitive edge.',
  },
  {
    icon: Bot,
    title: 'Chatbot Development',
    shortDescription: 'Customer support bots powered by GPT & NLP.',
    extendedDescription:
      'Our chatbot solutions provide 24/7 customer support, lead generation, and user engagement.',
    features: [
      'Conversational AI with natural language processing',
      'Integration with websites, apps, and messaging platforms',
      'Custom workflows for support and sales',
      'Analytics for user interaction insights',
    ],
    benefits:
      'Improve customer satisfaction and reduce support costs with intelligent, responsive chatbots.',
  },
  {
    icon: Share2,
    title: 'Social Media Automations',
    shortDescription: 'Automated posting, scheduling, and engagement.',
    extendedDescription:
      'Streamline your social media presence with automated tools for posting, scheduling, and analytics.',
    features: [
      'Automated post scheduling for Instagram, LinkedIn, etc.',
      'AI‑generated captions and content suggestions',
      'Engagement tracking and analytics dashboards',
      'Integration with social media APIs',
    ],
    benefits:
      'Save time and boost engagement with automated, data‑driven social media strategies.',
  },
] as const;
