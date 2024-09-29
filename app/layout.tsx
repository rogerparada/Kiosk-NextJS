import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Kiosk Next.js",
	description: "Kiosk Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased bg-slate-300`}>{children}</body>
		</html>
	);
}
