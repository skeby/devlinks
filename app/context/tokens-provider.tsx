// TokensProvider.tsx
"use client";

import { TokensContext } from "../context/tokens";
import React from "react";

const TokensProvider = ({
  tokens,
  children,
}: {
  tokens: any;
  children: React.ReactNode;
}) => {
  return (
    <TokensContext.Provider value={tokens}>{children}</TokensContext.Provider>
  );
};

export default TokensProvider;
