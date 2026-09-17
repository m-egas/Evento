import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EventsCard } from "../components/EventsCard";

export const MyEventsPage = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Fetch the events the current user is attending
  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Get the events saved for the current user
        const attendingEvents =
          JSON.parse(localStorage.getItem("attendingEvents")) || [];

        const myEventIds = attendingEvents
          .filter((item) => String(item.userId) === String(currentUser.id))
          .map((item) => String(item.eventId));

        // Fetch all the initial event and category data
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

        const allCategories = data.categories;

        // Keep only events the user is attending
        const myEvents = allEvents.filter((event) =>
          myEventIds.includes(String(event.id)),
        );

        setEvents(myEvents);
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching my events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  // Convert category IDs into category names
  const getCategoryNames = (categoryIds) => {
    return categoryIds
      .map((id) => {
        const category = categories.find(
          (category) => String(category.id) === String(id),
        );

        return category?.name;
      })
      .filter(Boolean);
  };

  // Format the event date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  // Show login message when there is no logged-in user
  if (!currentUser) {
    return (
      <Center minH="70vh">
        <Box textAlign="center">
          <Heading size="md" mb={3}>
            Please log in
          </Heading>

          <Text mb={5}>You need to be logged in to see your events.</Text>

          <Button
            colorScheme="teal"
            borderRadius="full"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </Box>
      </Center>
    );
  }

  return (
    <Box px={{ base: 4, sm: 6, md: 8 }} py={{ base: 6, md: 10 }}>
      <Heading
        textAlign="center"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={{ base: 6, md: 8 }}
      >
        My events
      </Heading>

      {/* Show loading state, events, or empty state */}
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : events.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={{ base: 4, md: 5 }}
          maxW="1400px"
          mx="auto"
          px={{ base: 1, md: 0 }}
        >
          {events.map((event) => (
            <EventsCard
              key={event.id}
              event={event}
              getCategoryNames={getCategoryNames}
              formatDate={formatDate}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box
          textAlign="center"
          mt={{ base: 8, md: 10 }}
          px={{ base: 4, md: 0 }}
        >
          <Text fontSize={{ base: "md", md: "lg" }}>
            You are not attending any events yet.
          </Text>

          <Button
            mt={4}
            colorScheme="teal"
            borderRadius="full"
            onClick={() => navigate("/")}
          >
            Explore events
          </Button>
        </Box>
      )}
    </Box>
  );
};
