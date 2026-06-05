import mongoose, { Schema, model, models } from "mongoose";

const VoeuSchema = new Schema(
  {
    nom: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

export const Voeu = models.Voeu || model("Voeu", VoeuSchema);
