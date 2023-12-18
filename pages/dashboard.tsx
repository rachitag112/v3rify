import { ConnectWallet, Web3Button, embeddedWallet, metamaskWallet, smartWallet, useAddress, useConnect, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { useState } from "react";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Card, CardFooter, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@nextui-org/react";
import { MailIcon } from '../components/MailIcon.tsx';
import { LockIcon } from '../components/LockIcon.tsx';
import Defaultlayout from "../layouts/default";


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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";


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
        <Defaultlayout>
            <div>
                <Button onPress={onOpen} color="primary">+ Add certificate</Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Certificate</ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        endContent={
                                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Certificate Title"
                                        placeholder="Enter title of certificate"
                                        variant="bordered"
                                    />
                                    <Input
                                        endContent={
                                            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-1" />
                                        }
                                        label="Description"
                                        placeholder="Brief description of certificate"
                                        type="description"
                                        variant="bordered"
                                    />
                                    <Dropdown>
                                        <DropdownTrigger className="w-1/3">
                                            <Button
                                                variant="faded"
                                            >
                                                Document Type
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                            <DropdownItem
                                                key="edit"
                                                description="Certificates are uploaded as PDFs"
                                            >
                                                PDF
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                    <div className="flex py-2 px-1 justify-between">
                                        <Checkbox
                                            classNames={{
                                                label: "text-small",
                                            }}
                                        >
                                            Remember me
                                        </Checkbox>
                                        <Link color="primary" href="#" size="sm">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Sign in
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <div className="p-8 flex items-start justify-center">
                    <Card
                        isFooterBlurred
                        radius="lg"
                        className="border-none"
                    >
                        <Image
                            alt="Certificate"
                            className="object-cover"
                            height={200}
                            src="/images (1).png"
                            width={200}
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 hover:bg-yellow-700">
                            <p className="text-tiny text-white/80">Available soon.</p>
                            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                Notify me
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Defaultlayout>
    )
};