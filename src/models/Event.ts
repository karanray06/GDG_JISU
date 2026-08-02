import mongoose, { Schema, Document, Model } from 'mongoose';

export enum EventType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  LIVE = 'LIVE',
  COMPLETED = 'COMPLETED',
}

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  type: EventType;
  location: string;
  capacity: number;
  rsvpCount: number;
  waitlistCount: number;
  startDate: Date;
  endDate: Date;
  status: EventStatus;
  resources: { name: string; url: string }[];
  meetLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: '/assets/logo-placeholder.png' },
    type: {
      type: String,
      enum: Object.values(EventType),
      required: true,
    },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    rsvpCount: { type: Number, default: 0 },
    waitlistCount: { type: Number, default: 0 },
    startDate: { type: Date, required: true, index: -1 },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      default: EventStatus.DRAFT,
      index: true,
    },
    resources: [{ name: String, url: String }],
    meetLink: { type: String },
  },
  { timestamps: true }
);

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
