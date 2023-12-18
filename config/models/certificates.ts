import mongoose, { Schema} from "mongoose";

const certificates = new Schema({
    OwnerAddress: {
        type: String,
        required: true,
    },
    certificateName: {
        type: String,
        required: true,
    },
    // certificateHash: String,
    // certificateUrl: String,
    Description: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        required: true,
    },
    DocumentType: {
        type: String,
        required: true,
    },
    VerifierAddress: {
        type: String,
        required: true,
    },
    OwnerName: {
        type: String,
        required: false,
    },
    OwnerEmail: {
        type: String,
        required: true,
    },
    OwnerPhone: {
        type: String,
        required: true,
    },
});