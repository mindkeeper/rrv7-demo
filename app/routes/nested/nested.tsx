import { Outlet } from "react-router";
import type { Route } from "./+types/nested";

export async function loader() {
  const duration = 2000;
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Nested route data loaded successfully!", duration });
    }, duration);
  });
  return data;
}

export default function Nested({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border-2 border-gray-700 p-6 text-center">
        <h1 className="text-2xl font-bold">Nested Route</h1>
        <p className="mt-4 text-gray-600">This is a nested route example.</p>
        <p>Below are the outlet of this page</p>
      </div>
      <div className="border-2 border-red-900 p-6 mt-4">
        <Outlet />
      </div>
    </div>
  );
}
