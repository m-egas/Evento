import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <Box bg="white">
      {/* Header container */}
      <Flex
        maxW="1400px"
        mx="auto"
        align="center"
        justify="space-between"
        px={{ base: 4, md: 8 }}
        py={{ base: 1, md: 2 }}
        gap={2}
      >
        {/* Evento logo links back to the home page */}
        <Link to="/">
          <Image
            src="/images/logo_evento.webp"
            alt="My Events logo"
            h={{ base: "55px", sm: "65px", md: "90px" }}
            w="auto"
            objectFit="contain"
          />
        </Link>

        <Navigation />
      </Flex>
    </Box>
  );
};
