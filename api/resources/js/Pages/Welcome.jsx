
import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function Welcome({ auth, canLogin, canRegister }) {
    const reduceMotion = useReducedMotion();
    const { scrollY } = useScroll();

    const navBgAlpha = useTransform(
        scrollY,
        [0, 140],
        reduceMotion ? [0.55, 0.62] : [0.28, 0.62],
    );
    const navBg = useTransform(navBgAlpha, (a) => `rgba(255, 255, 255, ${a})`);
    const navBlurPx = useTransform(
        scrollY,
        [0, 140],
        reduceMotion ? [12, 12] : [8, 18],
    );
    const navBackdrop = useTransform(
        navBlurPx,
        (px) => `saturate(1.2) blur(${px}px)`,
    );
    const navBorderAlpha = useTransform(
        scrollY,
        [0, 140],
        reduceMotion ? [0.22, 0.28] : [0.12, 0.35],
    );
    const navBorder = useTransform(
        navBorderAlpha,
        (a) => `rgba(229, 231, 235, ${a})`,
    );

    const gridSlots = useMemo(() => [0, 1, 2, 3], []);

    return (
        <>
            <Head title="Flood Monitoring System" />

            <div className="min-h-screen bg-gray-100 text-slate-800 selection:bg-sky-200 selection:text-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/80 via-gray-100 to-slate-200/90" />

                <div className="relative flex min-h-screen flex-col">
                    <motion.header
                        style={{
                            backgroundColor: navBg,
                            backdropFilter: navBackdrop,
                            WebkitBackdropFilter: navBackdrop,
                            borderBottomColor: navBorder,
                        }}
                        className="sticky top-0 z-40 flex shrink-0 items-center justify-between gap-3 border-b border-gray-200/0 px-4 py-3 sm:px-6"
                    >
                        <Link
                            href="/"
                            className="flex min-w-0 items-center gap-3"
                        >
                            <img
                                src="/img/logo.png"
                                alt=""
                                className="h-10 w-auto shrink-0 object-contain sm:h-11"
                            />
                            <span className="truncate text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
                                Flood Monitoring System
                            </span>
                        </Link>

                        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-800 ring-1 ring-transparent transition hover:bg-white/40 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    {canLogin ? (
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-800 ring-1 ring-transparent transition hover:bg-white/40 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                                        >
                                            Login
                                        </Link>
                                    ) : null}
                                    {canRegister ? (
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg border border-sky-500/40 bg-sky-500/15 px-3 py-2 text-sm font-semibold text-sky-900 shadow-sm backdrop-blur-sm transition hover:bg-sky-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                        >
                                            Register
                                        </Link>
                                    ) : null}
                                </>
                            )}
                        </nav>
                    </motion.header>

                    <main className="relative flex-1">
                        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                {gridSlots.map((i) => (
                                    <div
                                        key={i}
                                        className="min-h-[200px] rounded-2xl border border-dashed border-gray-300/70 bg-white/30 backdrop-blur-sm"
                                        aria-hidden
                                    />
                                ))}
                            </div>

                            

                            <section className="mt-14 space-y-4">
                      
                             
                            </section>
                        </div>
                    </main>

                    <footer className="relative border-t border-gray-200/60 bg-white/30 py-6 text-center text-xs text-gray-500 backdrop-blur-sm">
                        Flood Monitoring System
                    </footer>
                </div>
            </div>
        </>
    );
}
