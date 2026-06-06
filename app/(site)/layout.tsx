import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageBackground from "@/components/PageBackground";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <div className="relative min-h-full">
      <PageBackground />
      <div className="relative z-10 flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
    </div>
  );
}
