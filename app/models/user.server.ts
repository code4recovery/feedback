import md5 from "blueimp-md5";

import { formatString, formatToken } from "~/helpers";
import { db, sendMail } from "~/utils";

export async function login({
  email,
  request,
}: {
  email: string;
  request: Request;
}) {
  if (!email) {
    throw new Error("Email is required");
  }

  let user = await db.user.findUnique({
    select: {
      emailHash: true,
      loginToken: true,
    },
    where: { email },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        email,
        emailHash: md5(email),
        loginToken: formatToken(),
      },
    });
  }

  await sendMail({
    buttonLink: `/auth/${user.emailHash}/${user.loginToken}`,
    buttonText: "Confirm",
    headline: formatString(
      "Once you’ve confirmed that {email} is your email address, you’ll be logged in to the site.",
      { email }
    ),
    instructions: "Tap the button below to confirm:",
    request,
    subject: "Confirm your email address",
    to: email,
  });
}
