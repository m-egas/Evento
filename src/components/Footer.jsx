import { Box, Heading, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      mt={{ base: 8, md: 12 }}
      bg="White"
      borderTop="1px solid"
      borderColor="gray.200"
    >
      <Box
        maxW="1400px"
        mx="auto"
        px={{ base: 6, md: 8 }}
        py={{ base: 8, md: 14 }}
      >
        {/* Footer navigation sections */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 5 }}
          spacing={{ base: 6, md: 10 }}
          textAlign="center"
          justifyItems="center"
        >
          {/* Evento Logo */}
          <Box>
            <Image
              src="/images/logo_evento.webp"
              alt="Evento logo"
              maxW={{ base: "120px", md: "150px" }}
              maxH={{ base: "50px", md: "60px" }}
              objectFit="contain"
            />
          </Box>

          {/* Discover links */}
          <Box>
            <Heading size="sm" mb={4} color="gray.800">
              Discover
            </Heading>

            <Text
              color="gray.500"
              fontWeight="bold"
              mb={2}
              cursor="pointer"
              transition="color 0.2s"
              onClick={() => navigate("/events")}
              _hover={{ color: "teal.500" }}
            >
              Events
            </Text>

            <Text
              color="gray.500"
              fontWeight="bold"
              mb={2}
              cursor="pointer"
              transition="color 0.2s"
              onClick={() => navigate("/add-event")}
              _hover={{ color: "teal.500" }}
            >
              Create an Event
            </Text>

            <Text
              color="gray.500"
              fontWeight="bold"
              cursor="pointer"
              transition="color 0.2s"
              onClick={() => navigate("/signup")}
              _hover={{ color: "teal.500" }}
            >
              Join Evento
            </Text>
          </Box>

          {/* Account links */}
          <Box>
            <Heading size="sm" mb={4} color="gray.800">
              Account
            </Heading>

            <Text
              color="gray.500"
              fontWeight="bold"
              cursor="pointer"
              transition="color 0.2s"
              onClick={() => navigate("/signup")}
              _hover={{ color: "teal.500" }}
            >
              Sign up
            </Text>

            <Text
              color="gray.500"
              fontWeight="bold"
              cursor="pointer"
              transition="color 0.2s"
              onClick={() => navigate("/login")}
              _hover={{ color: "teal.500" }}
            >
              Log in
            </Text>
          </Box>

          {/* Other pages links */}
          <Box>
            <Heading size="sm" mb={4} color="gray.800">
              Other pages
            </Heading>

            <Text
              color="gray.500"
              fontWeight="bold"
              mb={2}
              cursor="pointer"
              transition="color 0.2s"
              _hover={{ color: "teal.500" }}
            >
              FAQ
            </Text>

            <Text
              color="gray.500"
              fontWeight="bold"
              mb={2}
              cursor="pointer"
              transition="color 0.2s"
              _hover={{ color: "teal.500" }}
            >
              Contact
            </Text>

            <Text
              color="gray.500"
              fontWeight="bold"
              cursor="pointer"
              transition="color 0.2s"
              _hover={{ color: "teal.500" }}
            >
              Terms of service
            </Text>
          </Box>

          {/* Social media links */}
          <Box>
            <Heading size="sm" mb={4} color="gray.800">
              Follow us
            </Heading>

            <Flex gap={4}>
              <Box
                as="a"
                href="#"
                aria-label="Instagram"
                color="gray.600"
                fontSize="22px"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{
                  color: "teal.600",
                }}
              >
                <FaInstagram />
              </Box>

              <Box
                as="a"
                href="#"
                aria-label="Facebook"
                color="gray.600"
                fontSize="22px"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{
                  color: "teal.600",
                }}
              >
                <FaFacebookF />
              </Box>

              <Box
                as="a"
                href="#"
                aria-label="TikTok"
                color="gray.600"
                fontSize="22px"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{
                  color: "teal.600",
                }}
              >
                <FaTiktok />
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Copyright information */}
        <Box
          mt={{ base: 10, md: 14 }}
          pt={6}
          borderTop="1px solid"
          borderColor="gray.200"
        >
          <Text
            fontSize="sm"
            color="gray.700"
            fontWeight="bold"
            textAlign="center"
          >
            © 2026 Evento. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
