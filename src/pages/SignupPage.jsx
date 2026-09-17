import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Create a new user
  const handleSignup = async () => {
    // Check that a name was entered
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    // Check that a username was entered
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);

    try {
      // Fetch the initial user data
      const response = await fetch("/events.json");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      const existingUsers = data.users || [];

      // Get locally stored users
      const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];

      // Combine existing users with locally created users
      const allUsers = [...existingUsers, ...localUsers];

      const normalizedUsername = username.trim().toLowerCase();

      // Check if the username already exists
      const usernameExists = allUsers.some(
        (user) => user.username?.trim().toLowerCase() === normalizedUsername,
      );

      if (usernameExists) {
        toast({
          title: "Username already exists",
          description: "Please choose a different username.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      // Create a new user
      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        username: normalizedUsername,
        image: image.trim(),
      };

      // Save the new user locally
      const updatedLocalUsers = [...localUsers, newUser];

      localStorage.setItem("localUsers", JSON.stringify(updatedLocalUsers));

      // Save the new user as the current user
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      toast({
        title: "Account created!",
        description: `Welcome to Evento, ${newUser.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Return to the home page
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);

      toast({
        title: "Sign up failed",
        description: "We couldn't create your account. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="white"
      px={{ base: 3, md: 4 }}
      py={{ base: 4, md: 12 }}
    >
      <Box
        position="relative"
        w="100%"
        maxW="550px"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="2xl"
        boxShadow="lg"
        p={{ base: 4, md: 10 }}
      >
        {/* Close button */}
        <IconButton
          position="absolute"
          top={4}
          right={4}
          size="sm"
          variant="ghost"
          aria-label="Close sign up"
          icon={<CloseIcon />}
          onClick={() => navigate("/")}
          _hover={{
            bg: "gray.100",
          }}
        />

        {/* Page title */}
        <Heading
          textAlign="center"
          color="gray.800"
          fontSize={{ base: "2xl", md: "3xl" }}
          mb={{ base: 5, md: 8 }}
        >
          Sign up
        </Heading>

        {/* Name */}
        <Box mb={{ base: 4, md: 6 }}>
          <Text fontWeight="bold" color="gray.700" mb={2}>
            Your name
          </Text>

          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            size={{ base: "md", md: "lg" }}
            borderRadius="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Text fontSize="sm" color="gray.500" mt={2}>
            Your name will be public on your Evento profile.
          </Text>
        </Box>

        {/* Username */}
        <Box mb={{ base: 4, md: 6 }}>
          <Text fontWeight="bold" color="gray.700" mb={2}>
            Username
          </Text>

          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Choose a username"
            size={{ base: "md", md: "lg" }}
            borderRadius="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Text fontSize="sm" color="gray.500" mt={2}>
            You will use this username to log in to Evento.
          </Text>
        </Box>

        {/* Profile image */}
        <Box mb={{ base: 4, md: 6 }}>
          <Text fontWeight="bold" color="gray.700" mb={2}>
            Profile image
          </Text>

          <Input
            id="image"
            name="image"
            type="url"
            placeholder="Enter an image URL (optional)"
            size={{ base: "md", md: "lg" }}
            borderRadius="lg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Text fontSize="sm" color="gray.500" mt={2}>
            Add a profile image so other people can recognize you.
          </Text>
        </Box>

        {/* Sign up button */}
        <Button
          w="100%"
          size={{ base: "md", md: "lg" }}
          borderRadius="full"
          bg="black"
          color="white"
          _hover={{
            bg: "gray.800",
          }}
          onClick={handleSignup}
          isLoading={loading}
          loadingText="Creating account..."
        >
          Sign up
        </Button>

        {/* Terms and privacy */}
        <Text
          textAlign="center"
          mt={5}
          fontSize="sm"
          color="gray.500"
          lineHeight="1.6"
        >
          By signing up, you agree to{" "}
          <Text
            as="span"
            color="gray.700"
            fontWeight="bold"
            cursor="pointer"
            _hover={{
              color: "teal.600",
            }}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            as="span"
            color="gray.700"
            fontWeight="bold"
            cursor="pointer"
            _hover={{
              color: "teal.600",
            }}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </Box>
    </Box>
  );
};
