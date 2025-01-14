import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Contact from "@/lib/models/Contact";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({ name, email, message });
    return NextResponse.json(
      { message: "Message sent successfully!", contact: newContact },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();

    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
