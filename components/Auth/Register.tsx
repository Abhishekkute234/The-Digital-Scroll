"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      // Create OAuth2 session
      await account.createOAuth2Session(
        "google" as OAuthProvider,
        "http://localhost:3000/", // Success redirect URL
        "http://localhost:3000/failure"
      );
    } catch (error) {
      console.error("OAuth2 session creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = async () => {
    try {
      setLoading(true);
      // Create OAuth2 session for GitHub
      await account.createOAuth2Session(
        "github" as OAuthProvider,
        "http://localhost:3000/",
        "http://localhost:3000/auth-callback-failure"
      );
    } catch (error) {
      console.error("GitHub auth error:", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="flex items-center space-x-4">
        {/* Mobile View Button */}
        <button
          type="button"
          className="text-sm font-medium md:hidden"
          onClick={() => setIsOpen(true)}
        >
          SignIn
        </button>
        {/* Desktop View Button */}
        <button
          type="button"
          className="hidden text-sm font-medium md:block"
          onClick={() => setIsOpen(true)}
        >
          SignIn
        </button>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl md:p-8">
                <div className="flex flex-col items-center">
                  <img
                    className="h-16 w-auto"
                    src="/logos/FyrreMagazineLogo-White.svg"
                    alt="logo"
                  />
                  <p className="my-6 text-center text-base font-bold text-gray-500 sm:text-lg lg:mb-8">
                    Sign in to access your account
                  </p>
                </div>

                {/* Auth Buttons */}
                <div className="flex flex-col gap-y-4">
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 disabled:opacity-50"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="h-5 w-5"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.1 0 5.9 1.2 8.1 3.3l6.1-6.1C34.1 3.5 29.3 1.5 24 1.5 14.8 1.5 7.2 7.2 4.3 15.1l7.7 6C13.3 15.1 18.2 9.5 24 9.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M46.4 24.5c0-1.7-.2-3.4-.5-5h-22v9h12.7c-.6 3.2-2.5 5.9-5.2 7.8l7.8 6C43.1 38.1 46.4 31.7 46.4 24.5z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M11.9 28.9c-1.1-3.2-1.1-6.8 0-10l-7.7-6c-2.7 5.3-2.7 11.7 0 17.1l7.7-6z"
                      />
                      <path
                        fill="#4285F4"
                        d="M24 46.5c5.4 0 10.4-1.8 14.3-4.9l-7.8-6c-2.1 1.4-4.7 2.2-7.5 2.2-5.8 0-10.7-3.9-12.4-9.1l-7.7 6C7.2 40.8 14.8 46.5 24 46.5z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    {loading ? "Loading..." : "Google SignIn"}
                  </button>

                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black hover:bg-gray-300 focus:ring-4 focus:ring-primary-300 border border-black disabled:opacity-50"
                    onClick={handleGitHubAuth}
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                    {loading ? "Loading..." : "GitHub SignIn"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuthModal;
