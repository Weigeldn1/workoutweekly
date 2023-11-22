import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";

interface RepsModalProps {
  showRepsModal: boolean;
  reps: number[];
  setShowRepsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReps: React.Dispatch<React.SetStateAction<number[]>>;
  handleSaveReps: () => void;
  setSelectedExercise: React.Dispatch<React.SetStateAction<string>>;
}

const RepsModal: React.FC<RepsModalProps> = ({
  showRepsModal,
  reps,
  setShowRepsModal,
  setReps,
  handleSaveReps,
  setSelectedExercise,
}) => {
  return (
    <Modal isOpen={showRepsModal} onClose={() => setShowRepsModal(false)}>
      {/* isOpen: when showRepsModal is true, dann wird uns angezeigt */}
      {/* onXlose: Sets ShowrrepsModal to false, when modeal is closed*/}
      <ModalOverlay />
      {/*dims the backgroudn when the modal is open */}
      <ModalContent>
        {/* Container for the modal content (header, body,footer*/}
        <ModalHeader>Enter Reps</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            value={reps[0]}
            onChange={(e) =>
              //When input value changes, onChange gets triggered,
              //e is eventObject, triggered by the change in the input field
              setReps((prevReps) => [
                parseInt(e.target.value), // Extracts the entered value from the input field, converts it to an integer
                prevReps[1], // Maintain the second value
                prevReps[2], // Maintain the third value
                ...prevReps.slice(3), // Keep the rest of the array
              ])
            }
            placeholder="Enter value 1"
          />
          <Input
            type="number"
            value={reps[1]}
            onChange={(e) =>
              setReps((prevReps) => [
                //when we use SetState(setReps), React interlly provides the previous state value
                prevReps[0], // Maintain the first value
                parseInt(e.target.value),
                prevReps[2], // Maintain the third value
                ...prevReps.slice(3), // Keep the rest of the array
              ])
            }
            placeholder="Enter value 2"
          />
          <Input
            type="number"
            value={reps[2]}
            onChange={(e) =>
              setReps((prevReps) => [
                prevReps[0], // Maintain the first value
                prevReps[1], // Maintain the second value
                parseInt(e.target.value),
                ...prevReps.slice(3), // Keep the rest of the array
              ])
            }
            placeholder="Enter value 3"
          />
          <Input
            type="number"
            value={reps[3]}
            onChange={(e) =>
              setReps((prevReps) => [
                prevReps[0], // Maintain the first value
                prevReps[1], // Maintain the second value
                prevReps[2], // Maintain the second value
                parseInt(e.target.value),
                ...prevReps.slice(4), // Keep the rest of the array
              ])
            }
            placeholder="Enter value 4"
          />
          <Input
            type="number"
            value={reps[4]}
            onChange={(e) =>
              setReps((prevReps) => [
                prevReps[0], // Maintain the first value
                prevReps[1], // Maintain the second value
                prevReps[2], // Maintain the second value
                prevReps[3], // Maintain the second value
                parseInt(e.target.value),
              ])
            }
            placeholder="Enter value 5"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveReps}>
            Save
          </Button>
          <Button onClick={() => setShowRepsModal(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RepsModal;
