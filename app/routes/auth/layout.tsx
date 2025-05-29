import { Route } from "lucide-react";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-svh flex flex-col gap-6 p-6 md:p-10 bg-muted items-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to={"#"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Route />
          </div>
          RRV7
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
