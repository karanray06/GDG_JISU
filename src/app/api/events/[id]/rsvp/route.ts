import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import RSVP, { RSVPStatus } from "@/models/RSVP";
import crypto from "crypto";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const eventId = params.id;
    const userId = (session.user as any).id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if user already RSVP'd
    const existingRSVP = await RSVP.findOne({ userId, eventId });
    if (existingRSVP) {
      return NextResponse.json({ error: "Already RSVP'd" }, { status: 400 });
    }

    // Determine status based on capacity
    // Note: In a high-concurrency production env, use Redis INCR and 
    // MongoDB transactions for truly atomic capacity management.
    let status = RSVPStatus.RSVPED;
    if (event.rsvpCount >= event.capacity) {
      status = RSVPStatus.WAITLISTED;
    }

    // Generate unique RSVP token for QR code
    const rsvpToken = crypto.randomBytes(16).toString("hex");

    const newRSVP = await RSVP.create({
      userId,
      eventId,
      status,
      rsvpToken,
    });

    // Update event counters
    if (status === RSVPStatus.RSVPED) {
      await Event.findByIdAndUpdate(eventId, { $inc: { rsvpCount: 1 } });
    } else {
      await Event.findByIdAndUpdate(eventId, { $inc: { waitlistCount: 1 } });
    }

    return NextResponse.json(newRSVP, { status: 201 });
  } catch (error: any) {
    console.error("RSVP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
