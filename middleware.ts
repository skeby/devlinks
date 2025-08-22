import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./app/config/firebase.config";

const PUBLIC_PATHS = ["/register", "/login"];

function isPublicPath(path: string) {
  return (
    PUBLIC_PATHS.includes(path) || path.startsWith("/u/") // ✅ allow /u/[uid] pages
  );
}

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (isPublicPath(request.nextUrl.pathname)) {
        // If user is logged in and visits public path, let them stay
        return NextResponse.next({
          request: {
            headers,
          },
        });
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      if (isPublicPath(request.nextUrl.pathname)) {
        return NextResponse.next(); // ✅ allow guests on public paths
      }

      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });

      if (isPublicPath(request.nextUrl.pathname)) {
        return NextResponse.next();
      }

      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|icons|u/.*).*)",
    "/api/login",
    "/api/logout",
  ],
};
