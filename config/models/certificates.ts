import mongoose, { Schema} from "mongoose";

const certificates = new Schema({
    ownerAddress: {
        type: String,
        required: true,
    },
    aadhaarNumber: {
        type: Number,
        required: true,
    },
    certificateTitle: {
        type: String,
        required: true,
    },
    // certificateHash: String,
    // certificateUrl: String,
    certificateDescription: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    documentType: {
        type: String,
        required: true,
    },
    verifierAddress: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: false,
    },
    ownerEmail: {
        type: String,
        required: true,
    },
    ownerPhone: {
        type: String,
        required: true,
    },
});