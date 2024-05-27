import { Form } from "@remix-run/react";

export function LoginForm() {
  return (
    <Form className="grid gap-3" method="post">
      <input type="hidden" name="subaction" value="login" />
      <label htmlFor="email">
        To get started, please confirm your email address.
      </label>
      <div className="flex flex-wrap gap-3">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="updates@intergroup.org"
          required
        />
        <input
          type="submit"
          className="bg-blue-500 text-white py-3 px-8"
          value="Confirm"
        />
      </div>
    </Form>
  );
}
