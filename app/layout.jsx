import './globals.css';

export const metadata = {
  title: 'iEducation - Learn Smart, Grow Faster',
  description:
    'iEducation mobile app for Admission, HSC, SSC and Class 8 below courses, books, free lectures, weekly quizzes and the best teachers.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#5B4DE7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-100 antialiased">{children}</body>
    </html>
  );
}
