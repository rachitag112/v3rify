import type { AppProps } from "next/app";
import {
	ThirdwebProvider,
	smartWallet,
	ConnectWallet,
	metamaskWallet,
	coinbaseWallet,
	walletConnect,
	localWallet,
	embeddedWallet,
	trustWallet,
	rainbowWallet,
	phantomWallet,
} from "@thirdweb-dev/react";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import { useRouter } from 'next/router';
import "@/styles/globals.css";

const activeChain = "mumbai";

const smartWalletConfig = {
	factoryAddress: "0x73606C5Cf20F5fE411878b1dFB3BF6d9372476ca",
	gasless: true,
};

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider>
				<ThirdwebProvider
					activeChain="mumbai"
					clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
					supportedWallets={[
						smartWallet(metamaskWallet({ recommended: true }), smartWalletConfig),
						smartWallet(walletConnect({ recommended: true }), smartWalletConfig),
						smartWallet(localWallet(), smartWalletConfig),
						smartWallet(coinbaseWallet(), smartWalletConfig),
						smartWallet(embeddedWallet(), smartWalletConfig),
						smartWallet(trustWallet(), smartWalletConfig),
						smartWallet(rainbowWallet(), smartWalletConfig),
						smartWallet(phantomWallet(), smartWalletConfig),
					]}
				>
					<Component {...pageProps} />
				</ThirdwebProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};
