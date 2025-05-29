import type { Route } from "./+types/profile";

interface Data {
  message: string;
  duration: number;
}
export async function loader() {
  const duration = 1000;
  const data: Data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "profile route data loaded successfully!", duration });
    }, duration);
  });
  return data;
}
export default function Profile({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p className="mt-4 text-gray-600">This is your profile page.</p>
      {loaderData && (
        <p className="mt-2 text-green-600">
          {loaderData.message} (Loaded in {loaderData.duration} ms)
        </p>
      )}
    </div>
  );
}
