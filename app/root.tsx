import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import stylesheet from "~/tailwind.css?url";
import { getUser } from "./utils";
import { UserContext } from "./hooks/user";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 dark:bg-gray-800 dark:text-white p-5">
        <div className="max-w-xl mx-auto my-5">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <UserContext.Provider value={user}>
      <Outlet />
    </UserContext.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="grid gap-6">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <h1>Error!</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </div>
  );
}
