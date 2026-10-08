import React from 'react';

export const metadata = {
  title: 'PANLATEC - Modern Solutions',
  description: 'PANLATEC Landing Page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
