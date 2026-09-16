import React from "react";
import {
  Button,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Navigation = () => {
  const navigate = useNavigate();

  // Get the currently logged-in user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Log out the current user and return to the home page
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <Flex align="center">
      {/* Desktop navigation */}
      <Flex display={{ base: "none", md: "flex" }} align="center" gap={3}>
        {currentUser ? (
          <>
            <Text fontWeight="bold">{currentUser.name}</Text>

            <Button
              variant="outline"
              fontWeight="bold"
              borderRadius="full"
              px={5}
              onClick={() => navigate("/my-events")}
            >
              My events
            </Button>

            <Button
              bg="black"
              color="white"
              fontWeight="bold"
              borderRadius="full"
              px={5}
              _hover={{ bg: "gray.800" }}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              fontWeight="bold"
              borderRadius="full"
              px={5}
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>

            <Button
              bg="black"
              color="white"
              fontWeight="bold"
              borderRadius="full"
              px={5}
              _hover={{ bg: "gray.800" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </>
        )}
      </Flex>

      {/* Mobile navigation */}
      <Flex display={{ base: "flex", md: "none" }} align="center" gap={2}>
        {/* Show the user's name outside the menu */}
        {currentUser && (
          <Text fontWeight="bold" fontSize="sm" whiteSpace="nowrap">
            {currentUser.name}
          </Text>
        )}

        {/* Hamburger menu */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Open navigation menu"
            icon={<HamburgerIcon boxSize={6} />}
            variant="ghost"
          />

          <MenuList>
            {currentUser ? (
              <>
                <MenuItem onClick={() => navigate("/my-events")}>
                  My events
                </MenuItem>

                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => navigate("/login")}>Log in</MenuItem>

                <MenuItem onClick={() => navigate("/signup")}>Sign up</MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
