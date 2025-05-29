import type { Route } from "./+types/nested.$id";

export function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    throw new Response("invalid id", { status: 404, statusText: "Not Found" });
  }
  return id;
}

export default function NestedId({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Nested ID Route</h1>
      <p className="mt-4 text-gray-600">This is a nested route with ID.</p>
      {loaderData && (
        <p className="mt-2 text-green-600">Loaded ID: {loaderData}</p>
      )}
    </div>
  );
}
