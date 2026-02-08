import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/producao')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/producao"!</div>;
}
