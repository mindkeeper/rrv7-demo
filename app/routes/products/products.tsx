import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "./+types/products";
import { Link, useLoaderData, useSearchParams } from "react-router";
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
type LoaderData = {
  products: Product[];
  currentOffset: number;
  limit: number;
  hasMore: boolean;
  hasPrevious: boolean;
};

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const offset = url.searchParams.get("offset") || "0";
  const limit = url.searchParams.get("limit") || "8";
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) {
    return {
      products: [],
      currentOffset: Number(offset),
      limit: Number(limit),
      hasMore: false,
      hasPrevious: false,
    };
  }
  const products: Product[] = await res.json();
  return {
    products,
    currentOffset: Number(offset),
    limit: Number(limit),
    hasMore: products.length === Number(limit),
    hasPrevious: Number(offset) > 0,
  };
}
export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center pt-6 min-h-screen bg-gray-100">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <CardTitle className="bg-gray-300 h-6 w-3/4 mb-2"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-300 h-48 w-full mb-4"></div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col items-start">
                <div className="bg-gray-300 h-6 w-1/2 mb-2"></div>
                <div className="bg-gray-300 h-4 w-1/3 mb-2"></div>
                <div className="bg-gray-300 h-4 w-1/4"></div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Products() {
  const { products, hasMore, hasPrevious, currentOffset, limit } =
    useLoaderData() as LoaderData;

  const [_, setSearchParams] = useSearchParams();

  const handlePrevious = () => {
    if (hasPrevious) {
      const newOffset = Math.max(currentOffset - limit, 0);
      setSearchParams({ offset: String(newOffset), limit: String(limit) });
    }
  };
  const handleNext = () => {
    if (hasMore) {
      const newOffset = currentOffset + limit;
      setSearchParams({ offset: String(newOffset), limit: String(limit) });
    }
  };
  return (
    <div className="flex flex-col items-center pt-6 min-h-screen bg-gray-100">
      <div className="w-full flex justify-end items-center px-6">
        <Button asChild>
          <Link to="/products/add">Add Product</Link>
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products?.length ? (
          products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 aspect-auto object-cover mb-4"
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col items-start">
                    <p className="text-lg font-semibold">${product.price}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {product.category.name}
                    </p>
                    <p>{product.description.slice(0, 100)}...</p>
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
        <div className="flex items-center justify-end col-span-4 gap-2">
          {hasPrevious && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {hasMore && (
            <Button variant="outline" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
