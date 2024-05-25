import type { MetaFunction } from "@remix-run/node";

import { strings } from "~/i18n";

export const meta: MetaFunction = () => {
  return [
    { title: strings.title },
    { name: "description", content: strings.description },
  ];
};

export default function Index() {
  return (
    <div className="grid gap-5">
      <h1>{strings.title}</h1>
      <p>{strings.description}</p>
      <p className="italic">{strings.disclaimer}</p>
      <p>
        <a href="/start">{strings.getStarted}</a>
      </p>
    </div>
  );
}
