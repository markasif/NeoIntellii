import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import AnalyticsManager from "@/components/analytics/AnalyticsManager";
import ContactClickTracker from "@/components/analytics/ContactClickTracker";
import { BookCallProvider } from "@/components/shared/BookCallModal";
import SmoothScroll from "@/components/animations/SmoothScroll";

const queryClient = new QueryClient();

export function AppProviders({ children, pathname = "/" }: { children: ReactNode; pathname?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <AnalyticsManager pathname={pathname} />
        <ContactClickTracker />
        <BookCallProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </BookCallProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
