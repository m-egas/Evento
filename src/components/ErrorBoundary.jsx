import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

// Handles unexpected rendering errors and displays a fallback UI.
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Store whether an error has occurred and the error details.
    this.state = { hasError: false, error: null };
  }

  // Update the component state when a rendering error occurs.
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details for debugging.
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  // Reset the error state and optionally reload the page.
  handleReload = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReload) this.props.onReload();
  };

  render() {
    // Display a fallback message when an error is detected.
    if (this.state.hasError) {
      return (
        <Box textAlign="center" p={8}>
          <Heading size="md" mb={3}>
            Oops! Something went wrong.
          </Heading>

          <Text mb={4} color="gray.600">
            We could not load the page right now. Please try again in a moment.
          </Text>
          <Button
            colorScheme="teal"
            borderRadius="full"
            onClick={this.handleReload}
          >
            Try again
          </Button>
        </Box>
      );
    }

    // Render the application normally when there is no error.
    return this.props.children;
  }
}
