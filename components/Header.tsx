"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { Models } from "appwrite";
import menuLinks from "@/data/menu";
import { User, LogOut } from "lucide-react";
import Contactusform from "./Auth/ContactUs";
import AuthModal from "./Auth/Register";

export default function Header() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
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
    <div className="flex flex-col items-center space-y-2">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        {user?.email ? (
          <User className="w-6 h-6 text-gray-600" />
        ) : (
          <span className="text-lg font-medium">{user?.name?.[0] || "?"}</span>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-1 text-sm text-red-600 hover:text-red-700 mt-1"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <header className="flex flex-col justify-between max-w-[95rem] w-full mx-auto px-4 md:pt-8 pt-4 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <div className="flex">
        <div className="flex flex-1">
          <Link href="/" aria-label="Return to homepage">
            <img
              className="h-16 w-auto"
              src="/logos/FyrreMagazineLogo-White.svg"
              alt="logo"
            />
          </Link>
        </div>
        <nav
          className="flex-1 items-center justify-end gap-6 flex"
          aria-labelledby="main-nav"
        >
          {menuLinks.map((menuItem, index) => (
            <Link key={index} href={menuItem.href}>
              {menuItem.label}
            </Link>
          ))}

          <Contactusform />

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
            </div>
          ) : user ? (
            <UserProfileSection />
          ) : (
            <AuthModal />
          )}
        </nav>
      </div>
      <hr className="border-black border-t-0 border mt-4" />
    </header>
  );
}
