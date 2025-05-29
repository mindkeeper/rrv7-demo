import { redirect } from "react-router";
import type { Route } from "./+types/products.$productId.delete";

export async function action({ params }: Route.ActionArgs) {
  const productId = params.productId;
  if (!productId || isNaN(Number(productId))) {
    throw new Response("Invalid product ID", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Response("Failed to delete product", {
      status: res.status,
      statusText: "Error",
    });
  }
  return redirect("/products");
}
