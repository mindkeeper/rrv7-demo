import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Link } from "react-router";
import type { Route } from "./+types/static-products";

export function meta() {
  return [
    { title: "Products" },
    { name: "description", content: "List of products" },
  ];
}

type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  id: number;
  rating: {
    rate: number;
    count: number;
  };
};

export async function loader() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    return [];
  }
  const products: Product[] = await res.json();
  return products;
}

export default function StaticProducts({
  loaderData: products,
}: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center pt-6 min-h-screen bg-gray-100">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products?.length ? (
          products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 aspect-auto object-contain mb-4"
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col items-start">
                    <p className="text-lg font-semibold">${product.price}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {product.category}
                    </p>
                    <div className="mt-2 text-sm text-gray-400">
                      Rating: {product.rating.rate} ({product.rating.count}{" "}
                      reviews)
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center col-span-full">
            <p className="text-gray-600">No products available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
