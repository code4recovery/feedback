import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";

import { Email } from "~/components";

export async function sendMail({
  buttonLink,
  buttonText,
  headline,
  instructions,
  request,
  subject,
  to,
}: {
  buttonLink: string;
  buttonText: string;
  headline: string;
  instructions: string;
  request: Request;
  subject: string;
  to: string;
}) {
  const { SENDGRID_API_KEY, SENDGRID_SENDER } = process.env;

  if (!SENDGRID_API_KEY || !SENDGRID_SENDER) {
    throw new Error("Missing SendGrid API key or sender");
  }

  sendgrid.setApiKey(SENDGRID_API_KEY);

  const { protocol, host } = new URL(request.url);
  const baseUrl = `${protocol}//${host}`;

  const emailProps = {
    buttonLink: `${baseUrl}${buttonLink}`,
    buttonText,
    headline,
    instructions,
    subject,
  };

  sendgrid.send({
    from: SENDGRID_SENDER,
    html: render(<Email {...emailProps} />),
    subject,
    to,
  });
}
