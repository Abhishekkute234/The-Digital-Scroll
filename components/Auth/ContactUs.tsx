"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contactusform = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormData({ name: "", email: "", message: "" });
      setIsOpen(false);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error); // Log the error for debugging
      alert(`Failed to send message. Please try again. Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    Object.values(formData).some((value) => !value) || isSubmitting;

  return (
    <>
      <div className=" sm:static sm:inset-auto sm:pr-0 md:ml-6">
        <div className="  md:hidden">
          <button
            type="button"
            className="text-15px font-bold"
            onClick={() => setIsOpen(true)}
          >
            Contact Us
          </button>
        </div>
        <div className="hidden md:block  ">
          <button
            type="button"
            className="text-15px space-links font-medium"
            onClick={() => setIsOpen(true)}
          >
            <span className=" mr-3 ml-3">Contact Us</span>
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-8">
                    <div className="flex flex-col items-center">
                      <img
                        className="h-16 w-auto"
                        src="/logos/FyrreMagazineLogo-White.svg"
                        alt="logo"
                      />
                    </div>
                    <p className="my-8 text-center font-bold text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
                      Contact us now? Want to send us a feedback?
                    </p>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-900"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          className="border-grey500 relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Name..."
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-900"
                        >
                          Your Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          className="border-grey500 relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="xyz@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-medium text-gray-900"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="border-grey500 relative block w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Leave a comment..."
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isDisabled}
                        className="bg-purple hover:bg-primary-800 focus:ring-primary-300 w-full rounded-lg px-5 py-3 text-center text-sm font-bold bg-black text-white focus:outline-none focus:ring-4 disabled:opacity-50"
                      >
                        {isSubmitting ? "Sending..." : "Send message"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Contactusform;
