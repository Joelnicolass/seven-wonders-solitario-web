"use client";

import React from "react";
import "swiper/css";
import { CardSelectionProvider } from "@/contexts/card_selection_context";

type Props = {
  children: React.ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return <CardSelectionProvider>{children}</CardSelectionProvider>;
};

export default RootProvider;
