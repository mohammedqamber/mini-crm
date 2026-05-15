import { SideNavbar } from "./sidenav/SideNavbar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className=" bg-background">
      <SideNavbar />
      <div className="pl-65">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
