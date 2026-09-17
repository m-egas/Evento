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

export const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle user login
  const handleLogin = async () => {
    // Check if username was entered
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter your username.",
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

      // Get users from the static data file
      const existingUsers = data.users || [];

      // Get users created through the signup page
      const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];

      // Combine both user lists
      const users = [...existingUsers, ...localUsers];

      // Find a user with a matching username
      const user = users.find(
        (user) =>
          user.username?.toLowerCase() === username.trim().toLowerCase(),
      );

      // Show an error if the user does not exist
      if (!user) {
        toast({
          title: "User not found",
          description: "We couldn't find an account with that username.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      // Save the logged-in user
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Show a success message
      toast({
        title: "Welcome back!",
        description: `Welcome back, ${user.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Return to the home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      // Show login error
      toast({
        title: "Login failed",
        description: "We couldn't log you in. Please try again.",
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
        maxW="500px"
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
          aria-label="Close login"
          icon={<CloseIcon />}
          onClick={() => navigate("/")}
        />

        {/* Page title */}
        <Heading
          textAlign="center"
          color="gray.800"
          fontSize={{ base: "2xl", md: "3xl" }}
          mb={2}
        >
          Welcome back
        </Heading>

        <Text
          textAlign="center"
          color="gray.500"
          fontSize={{ base: "sm", md: "md" }}
          mb={{ base: 5, md: 8 }}
        >
          Enter your username to continue.
        </Text>

        {/* Username */}
        <Box mb={{ base: 4, md: 6 }}>
          <Text fontWeight="bold" color="gray.700" mb={2}>
            Username
          </Text>

          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            size={{ base: "md", md: "lg" }}
            borderRadius="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <Text fontSize="sm" color="gray.500" mt={2}>
            Use the username you chose when you signed up.
          </Text>
        </Box>

        {/* Login button */}
        <Button
          w="100%"
          size={{ base: "md", md: "lg" }}
          borderRadius="full"
          bg="black"
          color="white"
          _hover={{
            bg: "gray.800",
          }}
          onClick={handleLogin}
          isLoading={loading}
          loadingText="Logging in..."
        >
          Log in
        </Button>

        {/* Sign up */}
        <Text textAlign="center" mt={6} color="gray.600">
          Do not have an account?{" "}
          <Text
            as="span"
            color="teal.600"
            fontWeight="bold"
            cursor="pointer"
            _hover={{
              color: "teal.700",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Text>
        </Text>
      </Box>
    </Box>
  );
};
