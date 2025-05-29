import { NavLink } from "react-router";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {}

export default function Login() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome</CardTitle>
          <CardDescription>
            Sign Up With Your Apple or Google Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  type="button"
                >
                  <Icons.apple />
                  Sign up with Apple
                </Button>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  type="button"
                >
                  <Icons.google />
                  Sign up with Google
                </Button>
              </div>
              {/* Separator with text */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or sign-in with
                </span>
              </div>
              {/* Input Section */}
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                  </div>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  Sign Up
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <NavLink
                  to={"/login"}
                  className="underline-offset-4 hover:underline"
                >
                  Sign in
                </NavLink>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
