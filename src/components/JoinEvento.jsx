import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const JoinEvento = () => {
  const navigate = useNavigate();

  return (
    <Box
      position="relative"
      maxW="1400px"
      mx="auto"
      mt={{ base: 12, md: 16 }}
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src="/images/join_evento.webp"
        alt="People enjoying events together"
        w="100%"
        h={{ base: "320px", sm: "380px", md: "550px" }}
        objectFit="cover"
      />
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.600"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={{ base: 6, md: 10 }}
      >
        <Box maxW="700px">
          <Heading
            color="white"
            size={{ base: "lg", sm: "xl", md: "2xl" }}
            mb={{ base: 3, md: 4 }}
          >
            Join Evento
          </Heading>

          <Text
            color="white"
            fontSize={{ base: "sm", sm: "md", md: "lg" }}
            lineHeight="1.6"
            mb={{ base: 4, md: 6 }}
          >
            People join Evento to meet new people, discover new things, find
            inspiration, step outside their comfort zones, and pursue their
            passions together.
          </Text>

          <Button
            bg="white"
            color="black"
            borderRadius="full"
            size={{ base: "md", md: "lg" }}
            px={{ base: 6, md: 8 }}
            onClick={() => navigate("/signup")}
            _hover={{
              bg: "gray.100",
            }}
          >
            Join Evento
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
