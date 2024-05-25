import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";

import { Email } from "~/components";
import { formatString } from "~/helpers";
import { strings } from "~/i18n";
// import { db } from "./db.server";

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

  /*
  const account = await db.account.findFirst({
    where: { id: accountID },
  });
  */

  const emailProps = {
    buttonLink: `${baseUrl}${buttonLink}`,
    buttonText,
    footer: formatString(
      "This email sent by {app} on behalf of {accountName}",
      {
        app: strings.title,
        accountName: "Test Account",
      }
    ),
    headline,
    imageHeight: 48,
    imageSrc:
      "https://code4recovery.org/wp-content/uploads/2023/09/central-logo.png",
    imageWidth: 48.4667,
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