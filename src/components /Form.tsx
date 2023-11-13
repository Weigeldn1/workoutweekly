import React, { FormEvent, useRef, useState, useEffect } from "react";

const Form = () => {
  const exerciseRef = useRef<HTMLSelectElement>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

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
      setCompletedExercises((prevExercises) => [
        ...prevExercises,
        selectedExercise,
      ]);

      // Save completed exercises to local storage
      localStorage.setItem(
        "completedExercises", //key
        JSON.stringify([...completedExercises, selectedExercise])
      );
      console.log(exerciseRef.current.value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exercise" className="form-label">
            Workouts
          </label>
          <select ref={exerciseRef} className="form-control">
            <option value="Push-Ups 5*60sec">Push-Ups 5*60sec</option>
            <option value="Push-Ups 5*90sec">Push-Ups 5*90sec</option>
            <option value=">Pull-Ups MAX 5*120sec">
              Pull-Ups MAX 5*120sec
            </option>
            <option value="Chin-Ups MAX 5*120sec">Chin-Ups MAX 5*120sec</option>
            <option value="Pull/Chin-Ups Mix 9*60sec">
              Pull/Chin-Ups Mix 9*60sec
            </option>
            <option value=" Handstand Floor/Handstand Push-Ups Wall 2*(3*3)">
              Handstand Floor/Handstand Push-Ups Wall 2*(3*3)
            </option>
            <option value="Handstand Bar/ Handstand Push-Ups Free 2*(3*3)">
              Handstand Bar/ Handstand Push-Ups Free 2*(3*3){" "}
            </option>
            <option value="Hold abs">Hold abs</option>
            <option value="Abs mix<">Abs mix</option>
            <option value="Jogging 1">Jogging 1</option>
            <option value="Jogging 2">Jogging 2</option>
            <option value="Jogging 3<">Jogging 3</option>
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
              <li className="list-group-item" key={index}>
                {exercise}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Form;
