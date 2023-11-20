import React, { FormEvent, useRef, useState, useEffect } from "react";
import ColorModeSwitch from "./ColorMode";
import { Button, Flex } from "@chakra-ui/react";
import { SliderMark } from "@mui/material";

const Form = () => {
  const exerciseRef = useRef<HTMLSelectElement>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [availableExercises, setAvailableExercises] = useState<string[]>([
    "Push-Ups 5*60sec",
    "Push-Ups 5*90sec",
    "Pull-Ups MAX 5*120sec",
    "Chin-Ups MAX 5*120sec",
    "Pull/Chin-Ups Mix 9*60sec",
    "Handstand Floor/Handstand Push-Ups Wall 2*(3*3)",
    "Handstand Bar/ Handstand Push-Ups Free 2*(3*3)",
    "Hold abs",
    "Abs mix",
    "Jogging 1",
    "Jogging 2",
    "Jogging 3",
    "Jogging 4",
  ]);

  useEffect(() => {
    //reason: Code for loading data from local Storage is exectued after the inital render ([])
    // Load completed exercises from local storage when the component mounts
    const storedExercises = localStorage.getItem("completedExercises");
    //retries value from completedExercise("Pushups 5*60sec") from local storage: JSON String
    if (storedExercises) {
      setCompletedExercises(JSON.parse(storedExercises));
      // comverting strings into array
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (exerciseRef.current !== null) {
      const selectedExercise = exerciseRef.current.value;

      // Remove the completed exercise from available exercises
      setAvailableExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise !== selectedExercise)
      );

      setCompletedExercises((prevExercises) => [
        ...prevExercises,
        selectedExercise,
      ]);

      // Save completed exercises to local storage
      localStorage.setItem(
        "completedExercises", //key
        JSON.stringify([...completedExercises, selectedExercise])
      );
    }
  };

  const handleDelete = (index: number) => {
    const updatedExercises = [...completedExercises]; //copy of the current state array
    const deletedExercise = updatedExercises.splice(index, 1)[0]; //remove 1 element at the specific index

    // Add the deleted exercise back to available exercises
    setAvailableExercises((prevExercises) => [
      ...prevExercises,
      deletedExercise,
    ]);

    setCompletedExercises(updatedExercises); //update state with uppdated array
    localStorage.setItem(
      "completedExercises",
      JSON.stringify(updatedExercises) //updatest local storage with the latest array.
      //Converts the array to a JSOn Strng befire storing it.
    );
  };

  return (
    <>
      <ColorModeSwitch />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exercise" className="form-label">
            Workouts
          </label>
          <select ref={exerciseRef} className="form-control">
            {availableExercises.map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Completed
        </button>
      </form>
      {completedExercises.length > 0 && (
        <div className="mb-3">
          <h2>Completed Workout:</h2>
          <ul className="list-group">
            {completedExercises.map((exercise, index) => (
              <Flex
                key={index}
                justifyContent="space-between"
                alignItems="center"
                p={2}
                borderWidth="1px"
                borderRadius="md"
                marginBottom={2}
              >
                {exercise}
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </Flex>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Form;
