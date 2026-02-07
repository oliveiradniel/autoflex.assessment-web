import {
  Link,
  Outlet,
  createRootRoute,
  useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import logoSideBar from '@/assets/images/logo-sidebar.png';
import { FactoryIcon, HomeIcon, PackageIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();

  const items = [
    {
      title: 'Início',
      url: '/',
      icon: HomeIcon,
      hasAction: false,
    },
    {
      title: 'Produtos',
      url: '/produtos',
      icon: PackageIcon,
      hasAction: true,
    },
    {
      title: 'Matérias Primas',
      url: '/materias-primas',
      icon: FactoryIcon,
      hasAction: true,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="p-2">
        <SidebarHeader className="group-data-[collapsible=icon]:hidden">
          <img src={logoSideBar} alt="Logo Sidebar" />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>MENU PRINCIPAL</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.url === location.pathname;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link to={item.url} className="px-3 py-5">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="w-screen">
        <SidebarTrigger />

        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </main>
    </SidebarProvider>
  );
}
