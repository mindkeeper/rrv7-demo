import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/auth/layout.tsx", [
    route("/login", "./routes/auth/login.tsx"),
    route("/register", "./routes/auth/register.tsx"),
  ]),

  layout("./routes/layout.tsx", [
    index("routes/home.tsx"),
    route("about", "./routes/pre-render/pre-render.tsx"),

    // Nested route
    route("nested", "./routes/nested/nested.tsx", [
      index("routes/nested/profile.tsx"),
      route("image", "./routes/nested/image.tsx"),
      route(":id", "./routes/nested/nested.$id.tsx", {}),
    ]),

    // prefix route
    ...prefix("static-products", [
      index("routes/static-products/static-products.tsx"),
      route(
        ":productId",
        "./routes/static-products/static-products.$productId.tsx"
      ),
    ]),
    ...prefix("products", [
      index("routes/products/products.tsx"),
      route("add", "./routes/products/products.add.tsx"),
      route(":productId", "./routes/products/products.$productId.tsx"),
      route(":productId/delete", "./routes/products/delete-product.ts"),
    ]),
  ]),
] satisfies RouteConfig;
