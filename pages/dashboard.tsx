import { ConnectWallet, Web3Button, embeddedWallet, metamaskWallet, smartWallet, useAddress, useConnect, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
// import { useState ,useEffect} from "react";
import {  useState, useEffect } from "react";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Spacer, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Card, CardFooter, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea, spacer } from "@nextui-org/react";
import Defaultlayout from "../layouts/default";
import FileUpload from "@/components/fileUpload";
import Page from "@/components/pythonCall";
import { motion } from 'framer-motion';

const embeddedWalletConfig = embeddedWallet({
});

const metamaskWalletConfig = metamaskWallet();
const smartWalletConfig = smartWallet(embeddedWalletConfig, {
    factoryAddress: "0x73606C5Cf20F5fE411878b1dFB3BF6d9372476ca",
    gasless: true,
});

export function Certificate(props: Props) {
  
	const handleSubmit = async (postId: string) => {
	  try {
		let response = await fetch(
		  "http://localhost:3000/api/postcertificate",
		  {
			method: "POST",
			body: JSON.stringify({
                title,
                content,
              }),
            headers: {
			  Accept: "application/json, text/plain, */*",
			  "Content-Type": "application/json",
			},
		  }
		);
		response = await response.json();
		window.location.reload();
	  } catch (error) {
		console.log("An error occurred while deleting ", error);
	  }
	};
  }

  



export default function Dashboard() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure(); //modal
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    // const [docs, setDocs] = useState([]);
    

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        documentType: '',
        verifierAddress: ''  
      });

      const [file, setFile] = useState();
      const { mutateAsync: upload } = useStorageUpload();
   

      
// for both modals
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
const [isToggled, setIsToggled] = useState(false);
const toggle = () => {
  setIsToggled(!isToggled);
};

const openAddModal = () => setIsAddModalOpen(true); 
const closeAddModal = () => setIsAddModalOpen(false);

const openIssueModal = () => setIsIssueModalOpen(true);
const closeIssueModal = () => setIsIssueModalOpen(false);
      
     
      
      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      }
      
    //   const handleSubmit = (formData) => {
    //     setDocs(prevDocs => [...prevDocs, formData]); 
    //     console.log(docs);
    //   }
      
      


    
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
            <motion.div
            className="message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            
            {/* <Text >No Certifications Added Yet</Text> */}
            <h1 style={{fontSize:'30px'}} > No Certifications Added Yet </h1>
            <Spacer y={1} />
            <p>Click below to add your certification documents</p>
            <Spacer y={1.5} />
          </motion.div>

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

                <div className="flex items-start justify-around">
                    <Button className="" onPress={openAddModal} color="primary">+ Add certificate</Button>

                    <Modal
                        isOpen={isAddModalOpen}
                        onOpenChange={closeAddModal}
                        placement="top-center"
                        // onSubmit={handleSubmit}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Add Certificate</ModalHeader>
                                    <ModalBody>
                                        
                                        <Input
                                            autoFocus
                                            label="Certificate Title"
                                            placeholder="Enter title of certificate"
                                            variant="bordered"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                        />
                                        <Textarea
                                            label="Description"
                                            placeholder="Brief description of certificate"
                                            variant="bordered"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
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
                                                   
                                                    value={formData.documentType}
                                                    onChange={handleInputChange}
                                                >
                                                    PDF
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>

                                        <Dropdown>
                                            <DropdownTrigger className="w-2/5">
                                                <Button
                                                    variant="faded"
                                                    name="verifierAddress"
                                                    value={formData.verifierAddress}
                                                    onChange={handleInputChange}
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
                                            {/* <FileUpload /> */}
                                            <div>
                                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                            <button onClick={uploadToIpfs}>Upload</button>
                                            </div>
                                        <Spacer y={4}/>
                                        <div className="flex py-2 px-1 justify-between" >
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
                                </>
                            )}
                        </ModalContent>
                    </Modal>



                    <Button className="" onPress={openIssueModal} color="danger">+ Issue Certificate</Button>

                    <Modal
                        isOpen={isIssueModalOpen}
                        onOpenChange={closeIssueModal}
                        placement="top-center"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Issue Certificate</ModalHeader>
                                    <ModalBody>
                                        
                                        <Input
                                            autoFocus
                                            label="Issued to"
                                            placeholder="Enter the issued to name"
                                            variant="bordered"
                                        />
                                        <label htmlFor="">Add Certificate Template</label>
                                        <FileUpload />
                                        <label htmlFor="">Add .xlsx file</label>
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
                                        <Button color="primary" onPress={Page} >
                                            Add Certificate
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </Defaultlayout>
    )
};
