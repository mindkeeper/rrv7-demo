import { redirect, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/products.add";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
};
export default function AddProduct() {
  const fetcher = useFetcher();
  const isPending = fetcher.state === "submitting";
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Card className="w-full max-w-md shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fetcher.Form method="post">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Product Title
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter product title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Price
                </label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter product description"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  type="text"
                  name="image"
                  placeholder="Enter product image URL"
                  required
                />
              </div>
              <Input type="hidden" name="category" value="1" />
              <Button
                type="submit"
                className={cn("w-full cursor-pointer", {
                  "animate-pulse": isPending,
                })}
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </fetcher.Form>
        </CardContent>
      </Card>
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("description");
  const image = [formData.get("image")];
  const category = formData.get("category");
  const payload = {
    title,
    price: Number(price),
    description,
    images: image,
    categoryId: Number(category),
  };

  const res = await fetch("https://api.escuelajs.co/api/v1/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Response("Failed to add product", {
      status: res.status,
      statusText: "Error",
    });
  }
  const newProduct = await res.json();
  return redirect(`/products/${newProduct.id}`);
}
