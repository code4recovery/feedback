import type { MetaFunction } from "@remix-run/node";

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
  return (
    <div className="grid gap-5">
      <h1>Welcome</h1>
      <p>
        This site will streamline the process of providing updates on meeting
        listings.
      </p>
      <p>
        <a href="/start">Get started</a>
      </p>
    </div>
  );
}
