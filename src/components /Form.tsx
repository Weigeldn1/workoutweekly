import React, { FormEvent, useRef, useState, useEffect } from "react";
import ColorModeSwitch from "./ColorMode";
import ExerciseDropdown from "./ExericseDropdown";
import RepsModal from "./RepsModal";
import CompletedExercises from "./CompletedExercises";

const Form = () => {
  const exerciseRef = useRef<HTMLSelectElement>(null);
  //useref hook is used to access the selected values from the dropdown menu, when the form is submitted

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [availableExercises, setAvailableExercises] = useState<string[]>([
    //string[] --> specifies data type of data that will be stored in the state,
    // is an empyt array that will hold srtings
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

  const [showRepsModal, setShowRepsModal] = useState<boolean>(false);
  //manages visibility of a modal window: Its a boolan and sets is inital state to false --> no visible when the component loads
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  //empty string: No exercise is selected when component moutns
  const [reps, setReps] = useState<number[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    //Should only run once when the component is mounted
    // if data is found --> previously stored data in localStorage
    const storedExercises = localStorage.getItem("completedExercises");
    if (storedExercises) {
      setCompletedExercises(JSON.parse(storedExercises));
      //Json parse to convert the JSON string bac into an array and updates the setCompledtedExercises
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // prevents page refresh
    if (exerciseRef.current !== null) {
      const selected = exerciseRef.current.value;
      setSelectedExercise(selected);

      if (
        selected.includes("Pull-Ups MAX 5*120sec") ||
        selected.includes("Pull/Chin-Ups Mix 9*60sec") ||
        selected.includes("Push-Ups 5*60sec") ||
        selected.includes("Push-Ups 5*90sec")
      ) {
        setShowRepsModal(true);
      } else {
        handleCompletedExercise(selected);
      }
    }
  };

  const handleCompletedExercise = (exercise: string) => {
    setAvailableExercises(
      (prevExercises) => prevExercises.filter((ex) => ex !== exercise)
      //Removing the completed exercise form the list of available exercises
      //filter creates a new array containing only elements where the callback function return true
      //ex represents each individual element of the array during interation
      // !== --> this is a strict inequality operaton in JS, checks if two values are not equal and ensures that their types are not the same
      //exercise:
    );
    setCompletedExercises((prevExercises) => [...prevExercises, exercise]);
    localStorage.setItem(
      //add data to the browers local storage
      "completedExercises", //represent the key under which the data will be stored
      JSON.stringify([...completedExercises, exercise])
      //Converts array into JSON string
    );
  };

  const handleDelete = (index: number) => {
    const updatedExercises = [...completedExercises];
    const deletedExercise = updatedExercises.splice(index, 1)[0];
    console.log(deletedExercise);
    //1: indictaes the number of of elements to remove starting from the index
    //[0]:
    setAvailableExercises((prevExercises) => [
      ...prevExercises,
      deletedExercise,
    ]);
    setCompletedExercises(updatedExercises);
    localStorage.setItem(
      "completedExercises",
      JSON.stringify(updatedExercises)
    );
  };

  const handleSaveReps = () => {
    // Check if all reps are greater than zero
    if (reps.every((rep) => rep > 0)) {
      // Format reps array into a string representation
      const formattedReps = reps.join(", ");

      // Add the exercise with reps to completed exercises
      handleCompletedExercise(`${selectedExercise}`);

      // Reset states and close the modal
      setShowRepsModal(false);
      setReps([0, 0, 0, 0, 0]);
      setSelectedExercise("");
    }
  };

  return (
    <>
      <ColorModeSwitch />
      <ExerciseDropdown
        exerciseRef={exerciseRef}
        availableExercises={availableExercises}
        handleSubmit={handleSubmit}
      />
      <RepsModal
        showRepsModal={showRepsModal}
        reps={reps}
        setShowRepsModal={setShowRepsModal}
        setReps={setReps}
        handleSaveReps={handleSaveReps}
        setSelectedExercise={setSelectedExercise}
      />
      <CompletedExercises
        completedExercises={completedExercises}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Form;
