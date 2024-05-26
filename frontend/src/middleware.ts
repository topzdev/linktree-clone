import {withAuth} from 'next-auth/middleware';
import {NextResponse} from 'next/server';
import pageRoutes from "@/configs/page-routes";

const protectedRoutes = [
    pageRoutes.dashboard.links.href,
    pageRoutes.dashboard.analytics.href,
    pageRoutes.dashboard.buttons.href,
    pageRoutes.dashboard.fonts.href,
    pageRoutes.dashboard.profile.href,
    pageRoutes.dashboard.settings.href,
    pageRoutes.dashboard.theme.href,
    pageRoutes.dashboard.preview.href,
];
const authRoutes = ['/login', '/register'];
const publicRoutes = ['/', '/about']
export const loginRoute = '/login';
export const homeRoute = pageRoutes.dashboard.links.href;
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;
        const isAuthenticated = !!token;
        const isAuthRoute = authRoutes.includes(pathname);
        const isProtectedRoute = protectedRoutes.includes(pathname);
        const isPublicRoute = publicRoutes.includes(pathname);

        if (isProtectedRoute && !isAuthenticated) {
            return NextResponse.redirect(new URL(loginRoute, req.nextUrl));
        }

        if (isAuthRoute && isAuthenticated) {
            return NextResponse.redirect(new URL(homeRoute, req.nextUrl));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({token}) => true,
        },
    },
)

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - services (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!services|_next/static|_next/image|favicon.ico).*)',
    ],
}