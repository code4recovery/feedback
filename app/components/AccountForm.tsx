import { Form } from "@remix-run/react";

export function AccountForm() {
  return (
    <Form className="grid gap-5" method="post">
      <input type="hidden" name="subaction" value="create-account" />
      <legend className="font-bold">Create an account</legend>
      <Field
        label="Name"
        name="name"
        placeholder="Anytown Intergroup of A.A."
        type="text"
      />
      <Field
        label="Slug"
        name="slug"
        placeholder="anytown-intergroup"
        type="text"
      />
      <Field
        label="Website URL"
        name="url"
        placeholder="https://intergroup.org"
        type="url"
      />
      <Field
        label="JSON Feed or Sheet URL"
        name="feedUrl"
        placeholder="https://intergroup.org/feed.json"
        type="url"
      />
      <div>
        <input
          type="submit"
          className="bg-blue-500 text-white py-3 px-8 mt-7"
          value="Create Account"
        />
      </div>
    </Form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type,
}: {
  label: string;
  name: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
