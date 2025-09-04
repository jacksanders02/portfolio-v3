import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home(): React.ReactElement {
  return <div />;
}
