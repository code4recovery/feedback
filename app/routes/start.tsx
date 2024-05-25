import type { ActionFunction, MetaFunction } from "@remix-run/node";

import { strings } from "~/i18n";
import { sendMail } from "~/utils";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // todo validation
  const siteName = formData.get("siteName")?.toString() ?? "";
  const url = formData.get("url")?.toString() ?? "";
  const json = formData.get("json")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const slug = siteName.toLowerCase().replace(/\s/g, "-");

  const buttonLink = new URL(`/${slug}`, request.url).toString();

  console.log({ buttonLink, url, json });

  await sendMail({
    buttonLink,
    buttonText: siteName,
    headline: "Confirm your email address",
    instructions: "Click the link below to go to your dashboard.",
    request,
    subject: `Welcome to ${formData.get("siteName")}`,
    to: email,
  });

  return null;
};

export const meta: MetaFunction = () => {
  return [
    { title: strings.getStarted },
    { name: "description", content: strings.getStartedDescription },
  ];
};

export default function Index() {
  return (
    <div className="grid gap-5">
      <h1>{strings.getStarted}</h1>
      <p>{strings.getStartedDescription}</p>
      <form className="grid gap-6" method="post">
        <Field
          label="Site Name"
          id="siteName"
          type="text"
          placeholder="Example Intergroup of A.A."
        />
        <Field
          label="Website Homepage"
          id="url"
          type="url"
          placeholder="https://example.org/"
        />
        <Field
          label="JSON Feed or Google Sheet URL"
          id="json"
          type="url"
          placeholder="https://example.org/feed.json"
        />
        <Field
          label="Your Email Address"
          id="email"
          type="email"
          placeholder={process.env.SENDGRID_SENDER ?? ""}
        />
        <div className="flex gap-6 items-center mt-6">
          <input
            type="submit"
            className="bg-blue-500 text-white py-3 px-8"
            value={strings.getStarted}
          />
          <a href="/">{strings.cancel}</a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  ...props
}: {
  label: string;
  id: string;
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  placeholder: string;
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        className="w-full"
        id={id}
        name={id}
        {...props}
        defaultValue={props.placeholder}
        required
      />
    </div>
  );
}
