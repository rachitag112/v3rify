import { ConnectWallet, Web3Button, embeddedWallet, metamaskWallet, smartWallet, useAddress, useConnect, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { useState } from "react";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Spacer, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Card, CardFooter, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea, spacer } from "@nextui-org/react";
import Defaultlayout from "../layouts/default";
import FileUpload from "@/components/fileUpload";

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
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); //modal
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";


    const address = useAddress();
    const connect = useConnect();

    const [personalWalletAddress, setPersonalWalletAddress] = useState<string | undefined>(undefined);
    const [smartWalletAddress, setSmartWalletAddress] = useState<string | undefined>(undefined);


    

    const [formData, setFormData] = useState({
     titleDocs : '', 
     desc: '',
      file: null
    });
    const [docs, setDocs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDoc = {
      titleDocs: formData.titleDocs,
      desc: formData.desc,
      file: formData.file,
    };

    setDocs((prevDocs) => {
      return [...prevDocs, newDoc];
    });

    // handleCloseModal();
  };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
          ...prevData,
          file,
        }));
      };



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
                <div className="p-8 flex items-start justify-center">   {/* card  */}
                    <Card
                        isFooterBlurred
                        radius="lg"
                        className="border-none"
                    >
                        <Image
                            alt="Certificate"
                            className="object-cover"
                            height={200}
                            src="/cert.png"
                            width={200}
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 hover:bg-yellow-700">
                            <p className="text-tiny text-white/80">Not Verified</p>
                            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                Mint Certificate
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex items-start justify-center">
                    <Button className="" onPress={onOpen} color="primary">+ Add certificate</Button>

                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="top-center"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Add Certificate</ModalHeader>
                                    <form onSubmit={handleSubmit} >
                                    <ModalBody>
                                        
                                        <Input
                                            autoFocus
                                            label="Certificate Title"
                                            placeholder="Enter title of certificate"
                                            variant="bordered"
                                            value={formData.titleDocs}   onChange={handleInputChange} name="titleDocs"
                                        />
                                        <Textarea
                                            label="Description"
                                            placeholder="Brief description of certificate"
                                            variant="bordered"
                                            value={formData.desc}   onChange={handleInputChange} name="desc"
                                        />

                                        <div className="flex justify-between">
                                        <Dropdown>
                                            <DropdownTrigger className="w-2/5">
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

                                        <Dropdown>
                                            <DropdownTrigger className="w-2/5">
                                                <Button
                                                    variant="faded"
                                                >
                                                    Verifier Address
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                <DropdownItem
                                                    key="edit"
                                                    description="We only have one verifier for now"
                                                >
                                                    0x6fdd7c9C4B9975f0fa5e25C5D54c63455f08Bb03
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        </div>
                                            <FileUpload />
                                        <Spacer y={4}/>
                                        <div className="flex py-2 px-1 justify-between">
                                            <Checkbox
                                                classNames={{
                                                    label: "text-small",
                                                }}
                                            >
                                                I hereby declare that the information provided is true and correct to the best of my knowledge and belief.
                                            </Checkbox>
                                        </div>
                                    </ModalBody>

                                 

                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Add Certificate
                                        </Button>
                                    </ModalFooter>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </Defaultlayout>
    )
};