import React from "react";

interface ExerciseDropdownProps {
  exerciseRef: React.RefObject<HTMLSelectElement>;
  availableExercises: string[];
  handleSubmit: (event: React.FormEvent) => void;
}

const ExerciseDropdown: React.FC<ExerciseDropdownProps> = ({
  exerciseRef,
  availableExercises,
  handleSubmit,
}) => {
  // these 3 props are expected to be passed as props when using this ExericseDropdown elsewhere in the application
  //the props are deinfed by the parent component (form.tsx)
  return (
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
  );
};

export default ExerciseDropdown;
