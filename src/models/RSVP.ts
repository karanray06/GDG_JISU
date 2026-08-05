import mongoose, { Schema, Document, Model } from 'mongoose';

export enum RSVPStatus {
  RSVPED = 'RSVPED',
  WAITLISTED = 'WAITLISTED',
  ATTENDED = 'ATTENDED',
  CANCELLED = 'CANCELLED',
}

export interface IRSVP extends Document {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  status: RSVPStatus;
  checkInTime?: Date;
  rsvpToken: string; // Unique token for QR code
  createdAt: Date;
  updatedAt: Date;
}

const RSVPSchema = new Schema<IRSVP>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    status: {
      type: String,
      enum: Object.values(RSVPStatus),
      default: RSVPStatus.RSVPED,
      index: true,
    },
    checkInTime: { type: Date },
    rsvpToken: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate RSVPs for the same user and event
RSVPSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const RSVP: Model<IRSVP> = mongoose.models.RSVP || mongoose.model<IRSVP>('RSVP', RSVPSchema);

export default RSVP;
