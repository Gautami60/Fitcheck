"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bookmark, Menu, X, User, LogOut, ArrowRight } from 'lucide-react';
import StylingBagDrawer from '../styling-bag/StylingBagDrawer';
import { getTotalStylingBagCount } from '../../utils/savedLooks';

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [user, setUser] = useState<{ id?: string; name?: string; email?: string } | null>(null);

  useEffect(() => {
    // Check auth
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    // Load styling bag & saved count
    const updateCount = () => {
      setSavedCount(getTotalStylingBagCount());
    };
    updateCount();
    window.addEventListener('fitcheck_saved_looks_updated', updateCount);
    window.addEventListener('fitcheck_styling_bag_updated', updateCount);
    return () => {
      window.removeEventListener('fitcheck_saved_looks_updated', updateCount);
      window.removeEventListener('fitcheck_styling_bag_updated', updateCount);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('tryonResult');
    setUser(null);
    router.push('/login');
  };

  const navLinks = user
    ? [
        { href: '/', label: 'Home' },
        { href: '/explore', label: 'Explore Runway' },
        { href: '/upload', label: 'Style Analysis' },
        { href: '/recommendations', label: 'Recommendations' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/profile', label: 'Profile' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/explore', label: 'Explore Runway' },
        { href: '/recommendations', label: 'Recommendations' },
      ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-[#C8C8C8] transition-colors">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-[68px] md:h-[88px] flex items-center justify-between">
          
          {/* Brand Logo (Left) */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-lg md:text-xl font-light tracking-[0.25em] text-[#151413] uppercase select-none hover:opacity-80 transition-opacity"
            >
              F I T C H E C K
            </Link>
            <span className="hidden xl:inline-block text-[10px] tracking-[0.2em] uppercase text-[#66625C] border-l border-[#C8C8C8] pl-6 font-medium">
              Runway &bull; Style Intelligence
            </span>
          </div>

          {/* Desktop Navigation (Center / Right) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-normal tracking-[0.1em] uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2 transition-colors relative ${
                    isActive
                      ? 'text-[#151413] font-medium'
                      : 'text-[#66625C] hover:text-[#151413]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0E0E0E]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Styling Bag (Saved Looks) */}
            <button
              onClick={() => setIsBagOpen(true)}
              className="group flex items-center gap-2.5 px-3.5 py-2 border border-[#C8C8C8] hover:border-[#151413] hover:bg-[#F7F7F6] transition-all text-xs uppercase tracking-wider text-[#151413]"
              aria-label="Open saved looks"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#151413]" />
              <span className="hidden sm:inline-block font-medium">Saved</span>
              <span className="min-w-5 h-5 px-1 bg-[#0E0E0E] text-white text-[10px] flex items-center justify-center font-medium">
                {savedCount}
              </span>
            </button>

            {/* Auth / Profile Actions */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3.5 py-2 border border-[#C8C8C8] hover:border-[#151413] transition-colors text-xs uppercase tracking-wider text-[#151413]"
                  title={user.name || 'User Profile'}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] truncate">{user.name?.split(' ')[0] || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Log Out"
                  className="p-2 border border-[#C8C8C8] hover:border-red-500 hover:text-red-600 transition-colors text-[#66625C]"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs uppercase tracking-widest text-[#66625C] hover:text-[#151413] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2A2927] transition-colors flex items-center gap-2"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 border border-[#C8C8C8] text-[#151413] hover:bg-[#F7F7F6] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#C8C8C8] bg-white px-6 py-8 space-y-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm tracking-[0.15em] uppercase py-1 ${
                      isActive ? 'font-semibold text-[#151413]' : 'text-[#66625C]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-[#DFDFDF] flex flex-col gap-3">
              {user ? (
                <>
                  <div className="text-xs text-[#66625C]">
                    Signed in as <span className="font-semibold text-[#151413]">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-3 border border-[#C8C8C8] text-xs uppercase tracking-widest text-[#151413] hover:bg-[#F7F7F6]"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 border border-[#C8C8C8] text-center text-xs uppercase tracking-widest text-[#151413]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 bg-[#0E0E0E] text-white text-center text-xs uppercase tracking-widest font-medium"
                  >
                    Request Access
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Slide-over Styling Bag Drawer */}
      <StylingBagDrawer isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />
    </>
  );
}

