"use client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        Hello there
      </QueryClientProvider>
    </main>
  );
}
