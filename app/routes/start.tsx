import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Get Started" },
    {
      name: "description",
      content: "Create an account.",
    },
  ];
};

export default function Index() {
  return (
    <div className="grid gap-5">
      <h1>Get Started</h1>
      <p>
        Provide some basic information about your site and we’ll get you
        started.
      </p>
      <p className="italic">
        Please note: this service is currently in beta and only available to
        A.A. websites.
      </p>
      <form className="grid gap-6">
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
          label="JSON Feed URL"
          id="json"
          type="url"
          placeholder="https://example.org/feed.json"
        />
        <Field
          label="Email Addresses"
          id="email"
          type="email"
          placeholder="john@example.org, updates@example.org"
        />
        <div className="flex gap-6 items-center mt-6">
          <input
            type="submit"
            className="bg-blue-500 text-white py-3 px-8"
            value="Get Started"
          />
          <a href="/">Cancel</a>
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
      <input className="w-full" id={id} name={id} {...props} />
    </div>
  );
}
