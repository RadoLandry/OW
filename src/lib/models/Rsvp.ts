import mongoose, { Schema, model, models } from "mongoose";

const RsvpSchema = new Schema(
  {
    nom: { type: String, required: true },
    presence: { type: String, required: true },
    accompagnants: { type: Number, default: 0 },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

export const Rsvp = models.Rsvp || model("Rsvp", RsvpSchema);
