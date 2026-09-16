import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export const HowEventoWorks = () => {
  return (
    <Box maxW="1400px" mx="auto" mt={{ base: 12, md: 16 }}>
      <Heading
        textAlign="center"
        size={{ base: "xl", md: "2xl" }}
        mb={{ base: 8, md: 10 }}
        color="gray.800"
      >
        How Evento works
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 6, md: 8 }}
        alignItems="start"
      >
        {/* Card 1 */}
        <Box
          bg="gray.50"
          borderRadius="2xl"
          p={{ base: 6, md: 7 }}
          border="1px solid"
          borderColor="gray.200"
          transition="all 0.2s ease"
          _hover={{
            transform: "translateY(-6px)",
            boxShadow: "md",
          }}
        >
          <Heading size="md" color="gray.800" mb={4} textAlign="center">
            1. Explore & Discover
          </Heading>

          <Text color="gray.600" textAlign="center" lineHeight="1.7">
            Browse events, meetups, workshops, and activities that match your
            interests. Discover something new or find people who share your
            passions.
          </Text>
        </Box>

        {/* Card 2 */}
        <Box
          bg="gray.50"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          border="1px solid"
          borderColor="gray.200"
          transition="all 0.2s ease"
          _hover={{
            transform: "translateY(-6px)",
            boxShadow: "md",
          }}
        >
          <Heading size="md" color="gray.800" mb={4} textAlign="center">
            2. Join Evento
          </Heading>

          <Text color="gray.600" textAlign="center" lineHeight="1.7">
            Sign up for free and become part of the community. Create your
            profile, connect with others, and start joining events.
          </Text>
        </Box>

        {/* Card 3 */}
        <Box
          bg="gray.50"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          border="1px solid"
          borderColor="gray.200"
          transition="all 0.2s ease"
          _hover={{
            transform: "translateY(-6px)",
            boxShadow: "md",
          }}
        >
          <Heading size="md" color="gray.800" mb={4} textAlign="center">
            3. Create & Attend
          </Heading>

          <Text color="gray.600" textAlign="center" lineHeight="1.7">
            Attend events that interest you or create your own. Meet people,
            share your passions, and experience something together.
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
