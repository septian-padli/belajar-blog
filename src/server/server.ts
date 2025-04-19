// server/trpc-server.ts
import { appRouter } from ".";
import { createContext } from "./context";

export async function getTrpcCaller() {
  const ctx = await createContext();
  return appRouter.createCaller(ctx);
}
