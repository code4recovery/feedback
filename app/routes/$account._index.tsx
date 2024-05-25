import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({ params }: LoaderFunctionArgs) {
  return json({ account: params.account });
}

export default function Dashboard() {
  const { account } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{account}</h1>
    </div>
  );
}
