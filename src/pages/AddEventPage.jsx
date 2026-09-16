import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Stack,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  Flex,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const AddEventPage = () => {
  // Store the values entered in the event form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigate = useNavigate();

  // Get the currently logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Redirect users who are not logged in to the signup page
  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
    }
  }, [currentUser, navigate]);

  // Fetch the available event categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Create and save the new event
  const handleAddEvent = async () => {
    // Convert selected category names into category IDs
    const categoryIds = selectedCategories
      .map((name) => categories.find((c) => c.name === name)?.id)
      .filter(Boolean)
      .map(Number);

    // Create the new event object
    const newEvent = {
      createdBy: currentUser.id,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    };

    // Send the new event to the API
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    // Return to the home page after successfully creating the event
    if (response.ok) {
      navigate("/");
    }
  };

  return (
    // Center the event form on the page
    <Box
      minH="calc(100vh - 80px)"
      px={{ base: 2, sm: 4, md: 6 }}
      py={{ base: 3, sm: 5, md: 8 }}
      bg="white"
    >
      <Box
        w="100%"
        maxW="560px"
        mx="auto"
        p={{ base: 3, sm: 5, md: 6 }}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        bg="white"
      >
        {/* Close button */}
        <Flex justify="flex-end">
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="ghost"
            onClick={() => navigate("/")}
          />
        </Flex>

        {/* Page title */}
        <Heading mb={6} size={{ base: "lg", md: "xl" }} textAlign="center">
          Add New Event
        </Heading>

        <Stack spacing={{ base: 3, md: 4 }}>
          <Input
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            id="description"
            name="description"
            placeholder="Description (From 5 till 20 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            id="image"
            name="image"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Input
            id="location"
            name="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Categories */}
          <FormLabel fontSize={{ base: "sm", md: "md" }} fontWeight="bold">
            Categories
          </FormLabel>

          <CheckboxGroup
            colorScheme="teal"
            value={selectedCategories}
            onChange={(values) => setSelectedCategories(values)}
          >
            <SimpleGrid
              columns={{ base: 2, sm: 2, md: 3 }}
              spacing={{ base: 3, md: 2 }}
            >
              {categories.map((cat) => (
                <Checkbox key={cat.id} value={cat.name}>
                  {cat.name}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CheckboxGroup>

          {/* Select start / end time */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
            {/* Start time */}
            <Box>
              <FormLabel
                htmlFor="startTime"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold"
              >
                Start Time
              </FormLabel>

              <Input
                id="startTime"
                name="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Box>

            {/* End time */}
            <Box>
              <FormLabel
                htmlFor="endTime"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold"
              >
                End Time
              </FormLabel>

              <Input
                id="endTime"
                name="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Box>
          </SimpleGrid>

          {/* Save or cancel the form buttons */}
          <Stack direction={{ base: "column", sm: "row" }} spacing={3} pt={2}>
            <Button
              colorScheme="teal"
              width={{ base: "100%", sm: "auto" }}
              flex={{ sm: "1" }}
              onClick={handleAddEvent}
            >
              Save Event
            </Button>

            <Button
              variant="outline"
              colorScheme="gray"
              width={{ base: "100%", sm: "auto" }}
              flex={{ sm: "1" }}
              onClick={() => navigate("/events")}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
