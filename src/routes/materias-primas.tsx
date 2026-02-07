import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/materias-primas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/materias-primas"!</div>
}
