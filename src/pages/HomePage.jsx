import { useEffect, useState } from "react";
import { Heading, Box, Text, Button, Spinner, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Hero } from "../components/Hero";
import { EventsGrid } from "../components/EventsGrid";
import { HowEventoWorks } from "../components/HowEventoWorks";
import { JoinEvento } from "../components/JoinEvento";

export const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Fetch events and categories
  useEffect(() => {
    const fetchEventsAndCategories = async () => {
      setLoading(true);
      setError(false);

      // Fetch the initial event and category data
      try {
        const response = await fetch("/events.json");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
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

        setEvents(allEvents);
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch events or categories:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsAndCategories();
  }, []);

  // Get category names from category IDs
  const getCategoryNames = (ids = []) =>
    ids
      .map((id) => {
        const category = categories.find(
          (category) => String(category.id) === String(id),
        );

        return category?.name || "Unknown";
      })
      .join(", ");

  // Format event dates for the user
  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Get the 4 upcoming events
  const latestEvents = [...events]
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 4);

  return (
    <Box
      px={{ base: 3, sm: 4, md: 6 }}
      pb={{ base: 6, md: 8 }}
      bg="white"
      minH="100vh"
    >
      <Hero />

      {/* Upcoming Events */}
      <Box maxW="1350px" mx="auto" mt={{ base: 10, md: 16 }}>
        <Flex justify="space-between" align="center" mb={{ base: 5, md: 6 }}>
          <Heading size={{ base: "md", md: "lg" }} color="gray.800">
            Upcoming Events
          </Heading>

          <Button
            variant="ghost"
            size={{ base: "xs", sm: "sm", md: "md" }}
            borderRadius="full"
            color="gray.700"
            fontWeight="bold"
            onClick={() => navigate("/events")}
            _hover={{
              bg: "black",
              color: "white",
            }}
          >
            View All Events →
          </Button>
        </Flex>

        {loading ? (
          <Flex justify="center" mt={10}>
            <Spinner size="md" mr={2} />
            <Text alignSelf="center">Loading events...</Text>
          </Flex>
        ) : error ? (
          <Box textAlign="center" mt={10} px={4}>
            <Heading size="md" mb={3}>
              Oops! Something went wrong.
            </Heading>

            <Text color="gray.600" mb={4}>
              We could not load the events right now. Please try again later.
            </Text>

            <Button
              colorScheme="teal"
              borderRadius="full"
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>
          </Box>
        ) : latestEvents.length > 0 ? (
          <EventsGrid
            events={latestEvents}
            getCategoryNames={getCategoryNames}
            formatDate={formatDate}
            mobileScrollable
          />
        ) : (
          <Text textAlign="center" mt={6}>
            No upcoming events found.
          </Text>
        )}
      </Box>
      <HowEventoWorks />
      <JoinEvento />
    </Box>
  );
};
