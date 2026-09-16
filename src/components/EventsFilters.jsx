import {
  Box,
  Button,
  Input,
  Flex,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const EventFilters = ({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategories,
  toggleCategory,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Event search and Add Event */}
      <Box
        maxW="1350px"
        w="100%"
        mx="auto"
        mb={3}
        px={{ base: 2, sm: 4, md: 6 }}
      >
        <Flex
          mb={4}
          justify="center"
          align="center"
          gap={{ base: 2, sm: 3, md: 4 }}
          w="100%"
        >
          <Input
            id="search"
            name="search"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            w="100%"
            maxW={{ base: "190px", sm: "300px", md: "350px" }}
            size={{ base: "sm", md: "md" }}
            bg="white"
          />

          <Button
            colorScheme="teal"
            size={{ base: "sm", md: "md" }}
            px={{ base: 3, sm: 4, md: 5 }}
            whiteSpace="nowrap"
            onClick={() => navigate("/add-event")}
          >
            Add New Event
          </Button>
        </Flex>
      </Box>

      {/* Category filters */}
      <Box
        maxW="1350px"
        mx="auto"
        mt={{ base: 8, md: 12 }}
        px={{ base: 4, md: 6 }}
      >
        <Box
          mb={6}
          overflowX={{ base: "auto", md: "visible" }}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {/* Category tags */}
          <Wrap
            justify="center"
            spacing={{ base: 2, md: 3 }}
            flexWrap={{ base: "nowrap", md: "wrap" }}
            minW={{ base: "max-content", md: "auto" }}
          >
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(
                Number(category.id),
              );

              return (
                <WrapItem key={category.id} flexShrink={0}>
                  <Tag
                    size={{ base: "md", md: "lg" }}
                    borderRadius="full"
                    variant="solid"
                    bg={isSelected ? "gray.600" : "gray.100"}
                    cursor="pointer"
                    px={{ base: 3, md: 4 }}
                    py={{ base: 2, md: 3 }}
                    transition="background 0.2s"
                    _hover={{
                      bg: isSelected ? "gray.700" : "gray.200",
                    }}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <TagLabel
                      fontWeight="bold"
                      color={isSelected ? "white" : "gray.700"}
                    >
                      {category.name}
                    </TagLabel>
                  </Tag>
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </Box>
    </>
  );
};
