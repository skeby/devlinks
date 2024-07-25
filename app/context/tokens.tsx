"use client";

import { Tokens } from "next-firebase-auth-edge";
import { createContext, useContext } from "react";

// Create a context with a default value
export const TokensContext = createContext<Tokens | null>(null);

// Create a custom hook to use the TokensContext
export const useTokens = () => {
  return useContext(TokensContext);
};
