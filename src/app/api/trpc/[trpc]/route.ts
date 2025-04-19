import { appRouter } from '@/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (request: Request) => {
    console.log('🔥 tRPC handler called');
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
