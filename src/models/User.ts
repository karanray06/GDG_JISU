import mongoose, { Schema, Document, Model } from 'mongoose';

export enum UserRole {
  MEMBER = 'MEMBER',
  CORE = 'CORE',
  LEAD = 'LEAD',
}

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  googleId?: string;
  role: UserRole;
  points: number;
  xp: number;
  attendedEvents: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    googleId: { type: String, index: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.MEMBER,
      index: true,
    },
    points: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    attendedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
