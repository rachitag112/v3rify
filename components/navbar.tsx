import {
	Button,
	Kbd,
	Link,
	Input,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
	Spacer,
} from "@nextui-org/react";

import { ConnectWallet } from "@thirdweb-dev/react";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
				<NavbarItem className="hidden md:flex">
					<ThemeSwitch />
					<Spacer x={5} />
					<ConnectWallet
						dropdownPosition={{
							side: "bottom",
							align: "center",
						}}
					/>
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
