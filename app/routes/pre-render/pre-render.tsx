import type { Route } from "./+types/pre-render";

interface Data {
  message: string;
  duration: number;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pre Render Page" },
    { name: "description", content: "This page is pre-rendered." },
    {},
  ];
}
export async function loader() {
  const duration = 2000;
  const data: Data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: `this page should be pre-rendered, it doesnt matter how long it takes to load the data, it will be pre-rendered on build time`,
        duration,
      });
    }, duration);
  });
  return data;
}

export default function PreRender({ loaderData }: Route.ComponentProps) {
  // create a pre render page that looks like about page
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="border-2 border-gray-700 p-6 text-center">
        <h1 className="text-2xl font-bold">Pre Render Page</h1>
        <p className="mt-4 text-gray-600 max-w-prose">
          {loaderData?.message || "This page is pre-rendered successfully!"}
        </p>
      </div>
      <div className="border-2 border-red-900 p-6 mt-4">
        <p className="text-red-900">This is a pre-rendered page example.</p>
      </div>
    </div>
  );
}
