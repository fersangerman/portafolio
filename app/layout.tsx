// This root layout is intentionally minimal.
// The real layout (html, head, body) lives in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
