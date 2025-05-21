import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// do not forget to add protected routes!!
const isProtectedRoute = createRouteMatcher([
  "/my-courses(.*)",
  "/course/(.*)/lecture(.*)",
  "/course/(.*)/manage(.*)",
  "/course/(.*)/create(.*)",
  "/instructor(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
