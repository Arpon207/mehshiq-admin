import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Fragment, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Context } from "../../Providers/AdminContext";

export default function Page() {
  const pathname = useLocation().pathname;
  const pathnames = pathname.split("/").filter((path) => path);
  const { notifications } = useContext(Context);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between w-full mr-10">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link to={"/"}>Dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathnames.length > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  {pathnames.map((link, index) => {
                    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const linkName =
                      link[0].toUpperCase() + link.slice(1, link.length);
                    const isLastPath = pathnames.length === index + 1;
                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          {!isLastPath ? (
                            <BreadcrumbLink asChild>
                              <Link to={href}>{linkName}</Link>
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage>{linkName}</BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                        {pathnames.length !== index + 1 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <p className="text-sm p-2 bg-slate-800 text-white rounded">
              New Orders : {notifications?.length}
            </p>
          </div>
        </header>
        <main className="px-5">
          <Outlet />
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
