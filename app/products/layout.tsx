export default function ProductsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="mt-16 md:py-4">{children}</div>;
}
