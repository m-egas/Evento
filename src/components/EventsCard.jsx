import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Event info. start, end, categories
const EventInfo = ({ label, value }) => (
  <Text fontSize="xs" color="gray.600">
    <Box as="span" fontWeight="bold" mr={1}>
      {label}:
    </Box>
    {value}
  </Text>
);

export const EventsCard = ({ event, getCategoryNames, formatDate }) => (
  <Link
    to={`/event/${event.id}`}
    style={{ textDecoration: "none", width: "100%" }}
  >
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w="100%"
      bg="white"
      shadow="md"
      _hover={{ shadow: "xl", cursor: "pointer", bg: "gray.50" }}
      h="100%"
    >
      <Image
        src={event.image}
        alt={event.title}
        objectFit="cover"
        w="100%"
        h={{ base: "150px", sm: "140px", md: "150px" }}
      />

      {/* Event info: title, descripton, start, end and categories */}
      <Box p={{ base: 3, sm: 4 }} display="flex" flexDirection="column">
        <Heading
          as="h3"
          size="sm"
          textAlign="center"
          mb={2}
          minH={{ base: "40px", md: "48px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {event.title}
        </Heading>

        <Text
          fontSize={{ base: "xs", sm: "sm" }}
          textAlign="center"
          mb={2}
          flex="1"
        >
          {event.description}
        </Text>

        <Stack fontSize="xs" textAlign="center" spacing={1}>
          <EventInfo label="Start" value={formatDate(event.startTime)} />
          <EventInfo label="End" value={formatDate(event.endTime)} />
          <EventInfo label="📍Location" value={event.location} />
          <EventInfo
            label="Categories"
            value={getCategoryNames(event.categoryIds)}
          />
        </Stack>
      </Box>
    </Box>
  </Link>
);
