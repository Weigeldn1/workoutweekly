import React from "react";
import { Flex, Button } from "@chakra-ui/react";

interface CompletedExercisesProps {
  completedExercises: string[];
  handleDelete: (index: number) => void;
}

const CompletedExercises: React.FC<CompletedExercisesProps> = ({
  completedExercises,
  handleDelete,
}) => {
  return (
    <>
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

export default CompletedExercises;
