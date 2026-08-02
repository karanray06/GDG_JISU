import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";
import RSVP, { RSVPStatus } from "@/models/RSVP";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user as any;
    if (role !== UserRole.CORE && role !== UserRole.LEAD) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { rsvpToken } = await req.json();
    if (!rsvpToken) {
      return NextResponse.json({ error: "RSVP Token is required" }, { status: 400 });
    }

    await dbConnect();

    // Find and update RSVP
    const rsvp = await RSVP.findOne({ rsvpToken });
    if (!rsvp) {
      return NextResponse.json({ error: "Invalid RSVP Token" }, { status: 404 });
    }

    if (rsvp.status === RSVPStatus.ATTENDED) {
      return NextResponse.json({ error: "User already checked in" }, { status: 400 });
    }

    rsvp.status = RSVPStatus.ATTENDED;
    rsvp.checkInTime = new Date();
    await rsvp.save();

    // Award Gamification Points (e.g., 50 points for attending an event)
    const attendee = await User.findById(rsvp.userId);
    if (attendee) {
      attendee.points += 50;
      attendee.xp += 100;
      if (!attendee.attendedEvents.includes(rsvp.eventId)) {
        attendee.attendedEvents.push(rsvp.eventId);
      }
      await attendee.save();
    }

    return NextResponse.json({ 
      success: true, 
      message: "Check-in successful",
      attendeeName: attendee?.name
    });

  } catch (error: any) {
    console.error("Check-in Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
