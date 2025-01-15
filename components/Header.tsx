"use client";
import { useState } from "react";
import Link from "next/link";
import menuLinks from "@/data/menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Contactusform from "./Auth/ContactUs";
import AuthModal from "./Auth/Register";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <header className="flex flex-col justify-between max-w-[95rem] w-full mx-auto px-4 md:pt-8 pt-4 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <div className="flex">
        <div className="flex flex-1">
          <Link href="/" aria-label="Return to homepage" onClick={handleClose}>
            <img
              className="h-full w-fit"
              src="/logos/FyrreMagazineLogo-Black.svg"
              alt="logo"
            />
          </Link>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger aria-labelledby="button-label">
            <span id="button-label" hidden>
              Menu
            </span>
            <svg
              aria-hidden="true"
              className="md:hidden"
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="25" height="4" fill="black" />
              <rect y="6" width="25" height="4" fill="black" />
              <rect y="12" width="25" height="4" fill="black" />
            </svg>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="w-full pt-14"
            aria-label="Menu Toggle"
          >
            <nav
              className="flex flex-col flex-1 justify-end gap-6"
              aria-labelledby="mobile-nav"
            >
              {menuLinks.map((menuItem, index) => (
                <Link key={index} href={menuItem.href} onClick={handleClose}>
                  {menuItem.label}
                </Link>
              ))}

              <AuthModal />

              <Contactusform />
            </nav>
          </SheetContent>
        </Sheet>
        <nav
          className="flex-1 items-center justify-end gap-6 hidden md:flex"
          aria-labelledby="desktop-nav"
        >
          {menuLinks.map((menuItem, index) => (
            <Link key={index} href={menuItem.href}>
              {menuItem.label}
            </Link>
          ))}

          <Contactusform />

          <AuthModal />
        </nav>
      </div>
      <hr className="border-black border-t-0 border mt-4" />
    </header>
  );
}
