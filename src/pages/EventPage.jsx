import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Avatar,
  Spinner,
  Center,
  IconButton,
  Card,
  Stack,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { EventButtons } from "../components/EventButtons";

// Display event information such as start time, end time, and categories
const EventInfo = ({ label, value }) => (
  <Text mb={2} fontSize={{ base: "sm", md: "md" }} wordBreak="break-word">
    <Box as="span" fontWeight="bold" mr={1}>
      {label}:
    </Box>
    {value}
  </Text>
);

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(false);

  // Check if the current user is already attending this event
  useEffect(() => {
    if (!currentUser || !eventId) return;

    const attendingEvents =
      JSON.parse(localStorage.getItem("attendingEvents")) || [];

    const isUserAttending = attendingEvents.some(
      (item) =>
        String(item.userId) === String(currentUser.id) &&
        String(item.eventId) === String(eventId),
    );

    setIsAttending(isUserAttending);
  }, [eventId]);

  // Add or remove the current user's attendance
  const handleAttend = () => {
    if (!currentUser) {
      return;
    }

    const attendingEvents =
      JSON.parse(localStorage.getItem("attendingEvents")) || [];

    // Remove the event if the user is already attending
    if (isAttending) {
      const updatedEvents = attendingEvents.filter(
        (item) =>
          !(
            String(item.userId) === String(currentUser.id) &&
            String(item.eventId) === String(eventId)
          ),
      );

      localStorage.setItem("attendingEvents", JSON.stringify(updatedEvents));
      setIsAttending(false);
    } else {
      // Add the event to the user's attending events
      const updatedEvents = [
        ...attendingEvents,
        {
          userId: currentUser.id,
          eventId: eventId,
        },
      ];

      localStorage.setItem("attendingEvents", JSON.stringify(updatedEvents));
      setIsAttending(true);
    }
  };

  // Fetch the event, categories and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the initial event, category and user data
        const response = await fetch("/events.json");

        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }

        const data = await response.json();

        const localEvents =
          JSON.parse(localStorage.getItem("localEvents")) || [];

        const eventOverrides =
          JSON.parse(localStorage.getItem("eventOverrides")) || {};

        const deletedEventIds =
          JSON.parse(localStorage.getItem("deletedEventIds")) || [];

        // Apply edits to the original events
        const updatedEvents = data.events.map((event) =>
          eventOverrides[event.id]
            ? { ...event, ...eventOverrides[event.id] }
            : event,
        );

        // Remove deleted original events
        const remainingEvents = updatedEvents.filter(
          (event) => !deletedEventIds.includes(String(event.id)),
        );

        // Remove deleted local events and combine all events
        const allEvents = [
          ...remainingEvents,
          ...localEvents.filter(
            (event) => !deletedEventIds.includes(String(event.id)),
          ),
        ];

        // Find the requested event
        const eventData = allEvents.find(
          (event) => String(event.id) === String(eventId),
        );

        setEvent(eventData);
        setCategories(data.categories);
        setUsers(data.users);
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  // Find the user who created the event
  const creator = users.find(
    (user) => String(user.id) === String(event?.createdBy),
  );

  // Format event dates into a readable format
  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Convert category IDs into category names
  const getCategoryNames = (ids = []) =>
    ids
      .map(
        (id) =>
          categories.find((cat) => Number(cat.id) === Number(id))?.name ||
          "Unknown",
      )
      .join(", ");

  // Show a loading state while the event data is loading
  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="md" />
        <Text>Loading event...</Text>
      </Center>
    );
  }

  // Show a message if the requested event does not exist
  if (!event) {
    return (
      <Center h="80vh">
        <Text fontSize="xl">Event not found.</Text>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="white" py={{ base: 4, md: 6 }}>
      <Box
        maxW={{ base: "100%", sm: "600px", md: "800px" }}
        mx="auto"
        p={{ base: 4, sm: 4, md: 6 }}
      >
        {/* Back arrow */}
        <IconButton
          aria-label="Go back"
          icon={<ArrowBackIcon boxSize={{ base: 6, md: 8 }} />}
          variant="ghost"
          mb={4}
          onClick={() => navigate(-1)}
        />

        {/* Main event card */}
        <Card borderRadius="lg" boxShadow="lg" overflow="hidden">
          {/* Event image */}
          <Image
            src={event.image || ""}
            alt={event.title}
            w="100%"
            maxH={{ base: "220px", sm: "280px", md: "400px" }}
            objectFit="cover"
          />

          {/* Attend button */}
          <Flex
            justify="flex-end"
            px={{ base: 3, sm: 4 }}
            pt={{ base: 2, sm: 3 }}
          >
            {currentUser && (
              <Button
                colorScheme={isAttending ? "green" : "teal"}
                variant={isAttending ? "solid" : "outline"}
                borderRadius="full"
                size={{ base: "sm", sm: "md" }}
                onClick={handleAttend}
              >
                {isAttending ? "✓ Attending" : "Attend"}
              </Button>
            )}
          </Flex>

          {/* Event title, description and details */}
          <CardBody px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
            <Heading
              as="h1"
              size={{ base: "lg", md: "xl" }}
              mb={2}
              textAlign="left"
            >
              {event.title}
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} mb={4} textAlign="left">
              {event.description}
            </Text>

            {/* Event info: start, end, categories */}
            <Stack spacing={{ base: 3, md: 2 }}>
              <EventInfo label="Start" value={formatDate(event.startTime)} />
              <EventInfo label="End" value={formatDate(event.endTime)} />
              <EventInfo label="Location" value={event.location} />
              <EventInfo
                label="Categories"
                value={getCategoryNames(event.categoryIds)}
              />
            </Stack>
          </CardBody>

          <CardFooter
            pt={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
          >
            {/* Edit and delete buttons for the event owner */}
            <EventButtons
              event={event}
              categories={categories}
              onUpdate={(updatedEvent) => setEvent(updatedEvent)}
            />

            {/* Created by info */}
            {creator && (
              <Flex
                align="center"
                fontSize={{ base: "sm", md: "md" }}
                textAlign="center"
              >
                <Avatar
                  src={creator.image}
                  name={creator.name}
                  size={{ base: "sm", md: "md" }}
                  mr={2}
                />

                <Text>
                  <strong>Created by:</strong> {creator.name}
                </Text>
              </Flex>
            )}
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
};
