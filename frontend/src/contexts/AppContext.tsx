// provides a centralized place to manage the application's state related to user authentication and toast notifications.

import React, { useContext, useState } from "react";
import Toast from "../components/toast";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

//all things that our components can access
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

//creates a new conteext
const AppContext = React.createContext<AppContext | undefined>(undefined); //when app loads for he firis time the context is going to be undefined

const stripePromise = loadStripe(STRIPE_PUB_KEY);

//provider wraps our components and gives our components access to all the thingss in the context.
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    //to check if user is logged in
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise
      }}
    >
      {/* show toast when thre is and sets it to undefined when no message is there */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
