import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { Spacer } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { maintitle, title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Dashboard from "./dashboard";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={maintitle()}>V3rify&nbsp;</h1>
					<Spacer y={10} />
					<h1 className={title()}>Verify&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>certificates&nbsp;</h1>
					<h1 className={title()}>
						with ease.
					</h1>
				</div>
				<Spacer y={20} />
				<div className="flex gap-3">
					<Link
						href="/dashboard"
						className={buttonStyles({
							color: "primary",
							radius: "full",
							variant: "shadow",
						})}
					>
						Verify Certificate
					</Link>
				</div>
			</section>
		</DefaultLayout>
	);
}