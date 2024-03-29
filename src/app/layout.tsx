import Header from "@/components/Header";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
export const metadata = {
  title: "DALL·E 2",
  description: "Generated by Decole Mills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          <div className="md:p-10">{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
