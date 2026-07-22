export const metadata = { title: "Notes (Next.js API)" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
