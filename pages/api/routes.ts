import { connectDB } from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

type Data = {
    name: string
  }
  
  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    res.status(200).json({ name: 'John Doe' })
  }
  