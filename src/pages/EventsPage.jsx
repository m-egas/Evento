import { useEffect, useState } from "react";
import { Heading, Box, Text, Button, Spinner, Flex } from "@chakra-ui/react";
import { EventFilters } from "../components/EventsFilters";
import { EventsGrid } from "../components/EventsGrid";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch events and categories
  useEffect(() => {
    const fetchEventsAndCategories = async () => {
      setLoading(true);
      setError(false);

      try {
        // Fetch the initial event and category data
        const response = await fetch("/events.json");

        if (!response.ok) {
          throw new Error("Failed to fetch events data");
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

        // Remove deleted local events and combine everything
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

  // Convert category IDs to names for display
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

  // Toggle a category filter on or off
  const toggleCategory = (categoryId) => {
    const numericId = Number(categoryId);

    setSelectedCategories((prev) =>
      prev.includes(numericId)
        ? prev.filter((id) => id !== numericId)
        : [...prev, numericId],
    );
  };

  // Filter events based on the search query and selected categories
  const filteredEvents = events.filter((event) => {
    const lowerQuery = searchQuery.toLowerCase();

    const matchesName = event.title.toLowerCase().includes(lowerQuery);

    const categoryNames = getCategoryNames(event.categoryIds).toLowerCase();

    const matchesCategoryName = categoryNames.includes(lowerQuery);

    const matchesSelectedCategory =
      selectedCategories.length === 0 ||
      event.categoryIds.some((id) => selectedCategories.includes(Number(id)));

    return (matchesName || matchesCategoryName) && matchesSelectedCategory;
  });

  return (
    <Box
      px={{ base: 3, sm: 4, md: 6 }}
      pb={{ base: 6, md: 8 }}
      bg="white"
      minH="100vh"
    >
      {/* Page Heading */}
      <Box
        maxW="1350px"
        mx="auto"
        pt={{ base: 8, md: 12, lg: 16 }}
        pb={{ base: 2, md: 4 }}
        textAlign="center"
      >
        <Heading
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          color="gray.800"
        >
          Discover Events
        </Heading>

        <Text
          mt={{ base: 2, md: 3 }}
          color="gray.500"
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
        >
          Find something interesting to do and connect with others.
        </Text>
      </Box>

      {/* Search + filters */}
      <Box maxW="1350px" mx="auto" mt={{ base: 6, md: 8 }}>
        <EventFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          setSelectedCategories={setSelectedCategories}
        />
      </Box>

      {/* Events */}
      <Box maxW="1350px" mx="auto" mt={{ base: 6, md: 8 }}></Box>

      {/* Loading / error / events card / Not found */}
      <Box minH="500px">
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
        ) : filteredEvents.length > 0 ? (
          <EventsGrid
            events={filteredEvents}
            getCategoryNames={getCategoryNames}
            formatDate={formatDate}
          />
        ) : (
          <Text textAlign="center" mt={6}>
            Event not found, try another event.
          </Text>
        )}
      </Box>
    </Box>
  );
};
