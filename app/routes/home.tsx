import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
    {},
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-svh">
      <div className="border-2 border-gray-700 p-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to React Router!</h1>
        <p className="mt-4 text-gray-600 max-w-prose">
          This is a new React Router v7 app. Explore the features and learn how
          to use it effectively.
        </p>
        <p className="mt-2 text-blue-600">
          <Link
            to="https://reactrouter.com/docs/en/v7/getting-started/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the Docs
          </Link>
        </p>
      </div>
    </div>
  );
}
