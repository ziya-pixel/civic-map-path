import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  useEffect(() => { reportLovableError(error, { boundary: "roadwatch_root_error" }); }, [error]);
  return <div className="grid min-h-screen place-items-center bg-cream p-6"><div className="max-w-md text-center"><p className="font-mono text-xs uppercase tracking-[.15em] text-coral">System note</p><h1 className="mt-3 text-3xl font-semibold text-ink">This page did not load</h1><p className="mt-3 text-ink/65">Refresh the field tool and try again.</p><button onClick={reset} className="mt-6 rounded-md bg-brand px-4 py-2 text-sm font-medium text-paper">Try again</button></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [
    { charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "RoadWatch — Pothole & Road Damage Reporting System" },
    { name: "description", content: "Report, map, and track damaged roads in your local community." },
    { property: "og:title", content: "RoadWatch — Pothole & Road Damage Reporting System" },
    { property: "og:description", content: "A civic field tool for reporting and repairing damaged roads." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" }, { rel: "icon", href: "/favicon.ico" }] }),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>; }
