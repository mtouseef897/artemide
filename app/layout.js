// components/Layout.js
export const metadata = {
    title: 'Artemide Congress',
    description: 'Develop By Jawad A.',
  };
  
  export default function Layout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  