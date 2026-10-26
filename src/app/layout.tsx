import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "GranaBank",
    template: "%s | GranaBank",
  },
  description: "Con cada compra, sumás orgullo granate",
};

export const viewport: Viewport = {
  themeColor: "#6e272d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        {/* La app está pensada mobile-first: en desktop la mostramos centrada
            con el ancho de un teléfono. */}
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-surface shadow-soft">
          {children}
        </div>
      </body>
    </html>
  );
}
