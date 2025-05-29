import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "./+types/products.$productId";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";

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

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Product Detail - ${data.title}` },
    { name: "description", content: data.description },
  ];
}
export async function loader({ params }: Route.LoaderArgs) {
  const productId = params.productId;
  if (!productId || isNaN(Number(productId))) {
    throw new Response("Invalid product ID", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`
  );
  if (!res.ok) {
    throw new Response("Product not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const product: Product = await res.json();
  return product;
}

export default function ProductDetail({
  loaderData: product,
}: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 aspect-auto object-contain mb-4"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">${product.price}</p>
            <p className="text-sm text-gray-600 capitalize">
              {product.category.name}
            </p>
            <p className="mt-2 text-gray-700">{product.description}</p>
          </div>
          <Form
            method="delete"
            action={"delete"}
            onSubmit={(e) => {
              const response = confirm(
                "Are you sure you want to delete this product?"
              );
              if (!response) {
                e.preventDefault();
              }
            }}
          >
            <Button type="submit" className="w-full mt-4" variant="destructive">
              Delete This Product
            </Button>
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
}
