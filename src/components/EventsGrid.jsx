import { Box, SimpleGrid } from "@chakra-ui/react";
import { EventsCard } from "./EventsCard";

export const EventsGrid = ({
  events,
  getCategoryNames,
  formatDate,
  mobileScrollable = false,
}) => {
  const cards = events.map((event) => (
    <Box
      key={event.id}
      w={{ base: "92%", sm: "100%" }}
      maxW={{ base: "380px", sm: "none" }}
      justifySelf="center"
      flex={mobileScrollable ? "0 0 calc(50% - 8px)" : undefined}
    >
      <EventsCard
        event={event}
        getCategoryNames={getCategoryNames}
        formatDate={formatDate}
      />
    </Box>
  ));

  if (mobileScrollable) {
    return (
      <Box
        display={{ base: "flex", md: "grid" }}
        gridTemplateColumns={{ md: "repeat(4, 1fr)" }}
        gap={{ base: 4, md: 5 }}
        overflowX={{ base: "auto", md: "visible" }}
        pb={{ base: 2, md: 0 }}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {cards}
      </Box>
    );
  }

  return (
    <SimpleGrid
      maxW="1350px"
      mx="auto"
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing={{ base: 4, md: 5 }}
    >
      {cards}
    </SimpleGrid>
  );
};
