import { ConnectWallet, Web3Button, embeddedWallet, metamaskWallet, smartWallet, useAddress, useConnect, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { useState } from "react";

const embeddedWalletConfig = embeddedWallet({
    // styles: {
    //   borderRadius: "10px",
    //   colorBackground: "#232323",
    //   colorPrimary: "lightseagreen",
    //   colorText: "#FFFFFF",
    // }
  });

const metamaskWalletConfig = metamaskWallet();
const smartWalletConfig = smartWallet(embeddedWalletConfig, {
    factoryAddress: "0x73606C5Cf20F5fE411878b1dFB3BF6d9372476ca",
    gasless: true,
});

export default function Dashboard() {
    const address = useAddress();
    const connect = useConnect();

    const [personalWalletAddress, setPersonalWalletAddress] = useState<string | undefined>(undefined);
    const [smartWalletAddress, setSmartWalletAddress] = useState<string | undefined>(undefined);

    const handleLogin = async () => {
        try {
            const personalWallet = await connect(metamaskWalletConfig);
            const personalWalletAddress = await personalWallet.getAddress();
            setPersonalWalletAddress(personalWalletAddress);

            const smartWallet = await connect(smartWalletConfig, {
                personalWallet: personalWallet,
                chainId: 80001,
            });
            const smartWalletAddress = await smartWallet.getAddress();
            setSmartWalletAddress(smartWalletAddress);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1> 

            <AnotherComponent />
        </div>
    )
};