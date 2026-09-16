import { Box, Heading, Image, Text } from "@chakra-ui/react";

export const Hero = () => {
  return (
    <Box
      position="relative"
      maxW="1400px"
      w="100%"
      mx="auto"
      mb={8}
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src="/images/friends.webp"
        alt="Discover events"
        w="100%"
        h={{ base: "260px", sm: "320px", md: "500px", lg: "600px" }}
        objectFit="cover"
      />

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={{ base: 5, md: 8 }}
        bg="blackAlpha.600"
        color="white"
      >
        <Heading size={{ base: "lg", md: "2xl" }}>
          DISCOVER. CONNECT. EXPERIENCE.
        </Heading>

        <Text mt={2} fontSize={{ base: "xs", sm: "sm", md: "lg" }}>
          Find something fun to do and join the community.
        </Text>
      </Box>
    </Box>
  );
};
