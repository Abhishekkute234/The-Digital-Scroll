"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";
import SuccessMessage from "./SuccessMessage";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      await account.createOAuth2Session(
        "google" as OAuthProvider,
        "https://the-digital-scroll.vercel.app/",
        "https://the-digital-scroll.vercel.app/failure"
      );
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error("OAuth2 session creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = async () => {
    try {
      setLoading(true);
      await account.createOAuth2Session(
        "github" as OAuthProvider,
        "https://the-digital-scroll.vercel.app/",
        "https://the-digital-scroll.vercel.app/failure"
      );
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error("GitHub auth error:", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Buttons */}
      <button
        type="button"
        className="text-15px font-bold sm:hidden"
        onClick={() => setIsOpen(true)}
      >
        Sign In
      </button>
      <button
        type="button"
        className="hidden sm:inline-block text-15px font-bold"
        onClick={() => setIsOpen(true)}
      >
        Sign In
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
          aria-labelledby="auth-modal-title"
          aria-describedby="auth-modal-description"
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
            <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                <Dialog.Title
                  id="auth-modal-title"
                  className="text-lg font-bold text-center text-gray-700"
                >
                  Sign In
                </Dialog.Title>
                <Dialog.Description
                  id="auth-modal-description"
                  className="mt-2 text-center text-sm text-gray-500"
                >
                  Access your account using one of the methods below.
                </Dialog.Description>

                {/* Auth Buttons */}
                <div className="flex flex-col gap-4 mt-6">
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Google Sign-In"}
                  </button>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-black bg-white px-5 py-3 text-sm font-bold text-black hover:bg-gray-200 disabled:opacity-50"
                    onClick={handleGitHubAuth}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "GitHub Sign-In"}
                  </button>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                  <div className="mt-4 text-center text-sm text-green-600">
                    ✅ Login successful!
                  </div>
                )}

                {/* Close Button */}
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Cancel
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
