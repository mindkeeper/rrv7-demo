import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Route } from "./+types/static-products.$productId";

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
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!res.ok) {
    throw new Response("Product not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const product: Product = await res.json();

  return product;
}

export default function StaticProductDetail({
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
            <p className="mt-2 text-gray-700">{product.description}</p>
            <div className="mt-2 text-sm text-gray-400">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
