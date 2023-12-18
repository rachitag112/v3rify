import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import { Spacer } from "@nextui-org/react";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex flex-col h-screen">
			<Head />
			<Navbar />
			<main className="container mx-auto max-w-7xl px-6 flex-grow">
				{children}
			</main>
			<footer className="w-full flex items-center justify-center py-3">
					<span className="text-default-600">Made with ❤️</span><Spacer x={1}/>
					<p className="text-warning"> By Team GUARDIANS OF THE GALAXY</p>
			</footer>
		</div>
	);
}
