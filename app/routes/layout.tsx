import { Loader2 } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { buttonVariants } from "~/components/ui/button";
import { NAVIGATIONS } from "~/constants/navigations";
import { cn } from "~/lib/utils";

export default function Layout() {
  return (
    <>
      <header className="w-full max-w-[800px] mx-auto border-2 rounded-md my-6">
        <nav className="flex items-center gap-2 h-10 px-4 bg-gray-100">
          {NAVIGATIONS.map((navigation, index) => (
            <NavLink
              to={navigation.path}
              key={index}
              className={({ isPending, isActive }) =>
                buttonVariants({
                  variant: "link",
                  className: cn({
                    "bg-blue-500 text-white": isActive,
                    "bg-gray-200 text-gray-800": isPending,
                  }),
                })
              }
            >
              {({ isPending }) =>
                isPending ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  navigation.label
                )
              }
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </>
  );
}
