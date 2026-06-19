import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});


export const metadata = {
  metadataBase: new URL('https://myself-lakshya-sharma.vercel.app'),
  title: 'Lakshya Sharma — Full Stack Developer',
  description:
    'Full Stack Developer specializing in React Native, Node.js, AI/RAG systems, and TypeScript. Building products that ship.',
  keywords: [
    'Lakshya Sharma',
    'Full Stack Developer',
    'React Native',
    'AI Developer',
    'RAG Systems',
    'Node.js',
    'TypeScript',
    'Delhi',
  ],
  authors: [{ name: 'Lakshya Sharma' }],
  openGraph: {
    title: 'Lakshya Sharma — Full Stack Developer',
    description:
      'Full Stack Developer specializing in React Native, Node.js, AI/RAG systems, and TypeScript. Building products that ship.',
    url: 'https://myself-lakshya-sharma.vercel.app',
    siteName: 'Lakshya Sharma',
    images: [
      {
        url: '/mine2.jpeg',
        width: 800,
        height: 600,
        alt: 'Lakshya Sharma — Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lakshya Sharma — Full Stack Developer',
    description:
      'Full Stack Developer specializing in React Native, Node.js, AI/RAG systems, and TypeScript.',
    images: ['/mine2.jpeg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
