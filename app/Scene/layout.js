// app/layout.js
export const metadata = {
  title: 'Artemide Congress',
  description: 'Develop By Jawad A.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
