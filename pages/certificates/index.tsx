import React, { useState } from "react";
import Layout from "../../layouts/default";

export default function AddPost() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        documentType: '',
        verifierAddress: ''  
      });

    const handleSubmit = async (e: any) => {
        let t = formData.title;
        let d = formData.description;
      e.preventDefault();
      if (formData.title && formData.description) {
        try {
          let response = await fetch("http://localhost:3000/api/addPost", {
            method: "POST",
            body: JSON.stringify({
              t,
              d,
              'documentType':'PDF',
                'verifierAddress': '0x6fdd7c9C4B9975f0fa5e25C5D54c63455f08Bb03'
            }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          });
          response = await response.json();
          setFormData.Title("");
          setFormData.description("");
          setMessage("Post added successfully");
        } catch (errorMessage: any) {
          setError(errorMessage);
        }
      } else {
        return setError("All fields are required");
      }
    };
  }