"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { Models } from "appwrite";
import menuLinks from "@/data/menu";
import { User, LogOut, Menu, X } from "lucide-react";
import Contactusform from "./Auth/ContactUs";
import AuthModal from "./Auth/Register";

export default function Header() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    checkUserStatus();

    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");
      if (
        menu &&
        !menu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkUserStatus = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const UserProfileSection = () => (
    <div className="flex flex-col items-center space-y-2 w-full lg:w-auto">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        {user?.email ? (
          <User className="w-6 h-6 text-gray-600" />
        ) : (
          <span className="text-lg font-medium">{user?.name?.[0] || "?"}</span>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 break-all">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-1 text-sm text-red-600 hover:text-red-700 mt-1 mx-auto"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <header className="relative bg-white z-50">
      <div className="max-w-[95rem] w-full mx-auto px-4 md:pt-8 pt-4 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-1">
            <Link href="/" aria-label="Return to homepage">
              <img
                className="h-8 sm:h-10 md:h-12 w-auto"
                src="/logos/FyrreMagazineLogo-White.svg"
                alt="logo"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            id="menu-button"
            className="lg:hidden text-gray-600 z-50 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuLinks.map((menuItem, index) => (
              <Link
                key={index}
                href={menuItem.href}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {menuItem.label}
              </Link>
            ))}
            <Contactusform />
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2"
                >
                  <User className="w-6 h-6" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                    <UserProfileSection />
                  </div>
                )}
              </div>
            ) : (
              <AuthModal />
            )}
          </nav>

          {/* Mobile Navigation */}
          <div
            id="mobile-menu"
            className={`fixed inset-0 lg:hidden bg-white transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-200 ease-in-out z-40`}
          >
            <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
              <nav className="flex flex-col space-y-4">
                {menuLinks.map((menuItem, index) => (
                  <Link
                    key={index}
                    href={menuItem.href}
                    className="text-lg text-gray-700 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {menuItem.label}
                  </Link>
                ))}
                <div onClick={() => setIsMenuOpen(false)} className="py-2">
                  <Contactusform />
                </div>
                {!loading && (
                  <div className="pt-4 border-t">
                    {user ? (
                      <UserProfileSection />
                    ) : (
                      <div onClick={() => setIsMenuOpen(false)}>
                        <AuthModal />
                      </div>
                    )}
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
        <hr className="border-black border-t-0 border mt-4" />
      </div>
    </header>
  );
}
