import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Root = () => {
  return (
    <Box>
      <ScrollToTop />
      <Header />

      <Outlet />

      <Footer />
    </Box>
  );
};
