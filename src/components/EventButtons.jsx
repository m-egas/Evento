import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const EventButtons = ({ event, categories, onUpdate }) => {
  // Manage the edit/delete modals and delete loading state.
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // Store the event information used in the edit form.
  const [editForm, setEditForm] = useState({
    title: event.title,
    description: event.description,
    image: event.image,
    location: event.location || "",
    startTime: event.startTime,
    endTime: event.endTime,
    categoryIds: event.categoryIds,
  });

  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Check if the logged-in user is the event owner.
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isOwner =
    currentUser && String(currentUser.id) === String(event.createdBy);

  // Update the edit form when an input changes.
  const handleInputChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // Update the selected categories in the edit form.
  const handleCategoryChange = (selected) =>
    setEditForm({ ...editForm, categoryIds: selected.map(Number) });

  // Save the edited event.
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) throw new Error("Failed to update");

      const updatedEvent = await response.json();

      // Update the event displayed on the page.
      onUpdate(updatedEvent);

      // Show a success message.
      toast({
        title: "Event updated",
        description: "The event was successfully updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setIsEditOpen(false);
    } catch (error) {
      // Show an error message if the update fails.
      toast({
        title: "Update failed",
        description: "There was an error updating the event.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Delete the event.
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");

      // Show a success message after deleting.
      toast({
        title: "Event deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Return to the events page.
      navigate("/");
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting the event.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  return (
    <>
      {/*Event action buttons*/}
      {isOwner && (
        <ButtonGroup
          size={{ base: "sm", md: "md" }}
          spacing={{ base: 2, md: 3 }}
        >
          <Button
            colorScheme="teal"
            variant="outline"
            borderRadius="full"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </Button>

          <Button
            colorScheme="red"
            variant="outline"
            borderRadius="full"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </Button>
        </ButtonGroup>
      )}

      {/* Edit event modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        size={{ base: "full", sm: "md", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={{ base: 0, sm: "lg" }}
          maxH={{ base: "100vh", md: "90vh" }}
        >
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />

          {/* Scrollable edit form */}
          <ModalBody overflowY="auto">
            <Input
              id="title"
              name="title"
              placeholder="Title"
              value={editForm.title}
              onChange={handleInputChange}
              mb={3}
            />
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              value={editForm.description}
              onChange={handleInputChange}
              mb={3}
            />

            <Text mb={1}>
              <strong>Image URL:</strong>
            </Text>

            <Input
              id="image"
              name="image"
              placeholder="Image URL"
              value={editForm.image}
              onChange={handleInputChange}
              mb={3}
            />

            <Text mb={1}>
              <strong>Location:</strong>
            </Text>

            <Input
              id="location"
              name="location"
              placeholder="Location"
              value={editForm.location}
              onChange={handleInputChange}
              mb={3}
            />

            {/* Start and end time */}
            <Text mb={1}>
              <strong>Start Time:</strong>
            </Text>

            <Input
              id="startTime"
              name="startTime"
              type="datetime-local"
              value={editForm.startTime ? editForm.startTime.slice(0, 16) : ""}
              onChange={handleInputChange}
              mb={3}
            />

            <Text mb={1}>
              <strong>End Time:</strong>
            </Text>

            <Input
              id="endTime"
              name="endTime"
              type="datetime-local"
              value={editForm.endTime ? editForm.endTime.slice(0, 16) : ""}
              onChange={handleInputChange}
              mb={3}
            />

            {/* Event categories */}
            <Text mb={1}>
              <strong>Categories:</strong>
            </Text>

            <CheckboxGroup
              value={editForm.categoryIds.map(String)}
              onChange={handleCategoryChange}
            >
              <Stack spacing={2}>
                {categories.map((cat) => (
                  <Checkbox key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </ModalBody>

          {/* Edit modal actions */}
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              Save
            </Button>

            <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </Text>
          </ModalBody>

          {/* Delete confirmation actions */}
          <ModalFooter>
            <Button onClick={() => setIsDeleteOpen(false)} mr={3}>
              Cancel
            </Button>

            <Button
              colorScheme="red"
              onClick={handleDelete}
              isLoading={deleting}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
