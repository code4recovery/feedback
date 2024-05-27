import {
  redirect,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";

import { AccountForm, LoginForm } from "~/components";
import { useUser } from "~/hooks";
import { login, createAccount } from "~/models";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // todo validation
  const subaction = formData.get("subaction")?.toString().trim() ?? "";

  if (subaction === "create-account") {
    const accountUrl = await createAccount({
      name: formData.get("name")?.toString().trim() ?? "",
      slug: formData.get("slug")?.toString().trim() ?? "",
      url: formData.get("url")?.toString().trim() ?? "",
      feedUrl: formData.get("feedUrl")?.toString().trim() ?? "",
      request,
    });
    return redirect(accountUrl);
  } else if (subaction === "login") {
    await login({
      email: formData.get("email")?.toString().trim() ?? "",
      request,
    });
  }

  return null;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Feedback" },
    {
      name: "description",
      content:
        "Streamline the process of providing updates on meeting listings.",
    },
  ];
};

export default function Index() {
  const user = useUser();

  return (
    <div className="grid gap-5">
      <h1>Feedback</h1>
      <p>Streamline the process of providing updates on meeting listings.</p>
      <p className="italic">
        Please note: this service is currently in beta and is configured for
        A.A. websites.
      </p>
      {user ? <AccountForm /> : <LoginForm />}
    </div>
  );
}
