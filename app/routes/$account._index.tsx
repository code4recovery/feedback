import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAccount } from "~/models";

export async function loader({ params }: LoaderFunctionArgs) {
  const account = await getAccount(params.account ?? "");
  return json({ account });
}

export default function Dashboard() {
  const { account } = useLoaderData<typeof loader>();
  return (
    <div className="grid gap-5">
      <h1>{account.name}</h1>

      <div>
        <h2 className="font-bold">Users</h2>
        <ul className="list-disc pl-5">
          {account.users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
          <li>
            <a href={`${account.slug}/new-user`}>Add new</a>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold">Requests</h2>
        <ul className="list-disc pl-5">
          <li>
            <a href={`/${account.slug}/view/odaat`}>One Day at a Time</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
