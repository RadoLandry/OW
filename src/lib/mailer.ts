import nodemailer from "nodemailer";

type WishPayload = {
  nom: string;
  message: string;
  date?: Date | string;
};

type RsvpPayload = {
  nom: string;
  presence: string;
  accompagnants: number;
  date?: Date | string;
};

const NOTIFICATION_RECIPIENTS = [
  "raharilarissa@gmail.com",
  "randriaradolandry@gmail.com",
];

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Configuration SMTP incomplète");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendWishNotificationEmail(payload: WishPayload) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("Adresse expéditeur SMTP manquante");
  }

  const transporter = createTransporter();
  const sentAt = payload.date ? new Date(payload.date) : new Date();
  const formattedDate = Number.isNaN(sentAt.getTime()) ? new Date().toLocaleString("fr-FR") : sentAt.toLocaleString("fr-FR");

  const text = [
    "Nouveau vœu ajouté sur le site.",
    "",
    `Nom: ${payload.nom}`,
    `Message: ${payload.message}`,
    `Date: ${formattedDate}`,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
      <h2 style="margin-bottom: 12px;">Nouveau vœu ajouté</h2>
      <p><strong>Nom :</strong> ${payload.nom}</p>
      <p><strong>Message :</strong> ${payload.message}</p>
      <p><strong>Date :</strong> ${formattedDate}</p>
      <p style="margin-top: 20px; color: #6b7280;">Confirmation envoyée automatiquement après ajout.</p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: NOTIFICATION_RECIPIENTS,
    subject: `Nouveau vœu de ${payload.nom}`,
    text,
    html,
  });
}

export async function sendRsvpNotificationEmail(payload: RsvpPayload) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("Adresse expéditeur SMTP manquante");
  }

  const transporter = createTransporter();
  const sentAt = payload.date ? new Date(payload.date) : new Date();
  const formattedDate = Number.isNaN(sentAt.getTime()) ? new Date().toLocaleString("fr-FR") : sentAt.toLocaleString("fr-FR");
  const presenceLabel = payload.presence === "present" ? "Présent(e)" : "Absent(e)";

  const text = [
    "Nouvelle réponse RSVP reçue.",
    "",
    `Nom: ${payload.nom}`,
    `Présence: ${presenceLabel}`,
    `Accompagnants: ${payload.accompagnants}`,
    `Date: ${formattedDate}`,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
      <h2 style="margin-bottom: 12px;">Nouvelle réponse RSVP</h2>
      <p><strong>Nom :</strong> ${payload.nom}</p>
      <p><strong>Présence :</strong> ${presenceLabel}</p>
      <p><strong>Accompagnants :</strong> ${payload.accompagnants}</p>
      <p><strong>Date :</strong> ${formattedDate}</p>
      <p style="margin-top: 20px; color: #6b7280;">Notification envoyée automatiquement après ajout.</p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: NOTIFICATION_RECIPIENTS,
    subject: `Nouveau RSVP de ${payload.nom}`,
    text,
    html,
  });
}