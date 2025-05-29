import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // prerender: ["about"],
  async prerender() {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products for prerendering");
    }
    const products = await res.json();
    return [
      "/",
      "about",
      "/products",
      ...products.map((product: { id: number }) => `products/${product.id}`),
    ];
  },
} satisfies Config;
