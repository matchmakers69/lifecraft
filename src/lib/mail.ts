
import { paths } from "@/constants";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}${paths.verification()}?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev", // TODO temporary only change to company name i.e
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}${paths.newPassword()}?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev", // TODO temporary only
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href=${resetLink}>here</a> to reset your password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev", // TODO temporary only
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
