import { createRouter } from '@tanstack/react-router';

import { routeTree } from './route-tree.generated';

export const router = createRouter({
  routeTree: routeTree,
});
