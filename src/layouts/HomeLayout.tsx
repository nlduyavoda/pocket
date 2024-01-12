export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-10 inline-flex flex-wrap">{children}</div>;
}
