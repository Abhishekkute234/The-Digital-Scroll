import Contact from "@/lib/models/Contact";
import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/lib/db";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();

    if (req.method === "POST") {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newContact = await Contact.create({ name, email, message });
      return res.status(200).json({ message: "Message sent successfully!", contact: newContact });

    } else if (req.method === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json(contacts);
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;