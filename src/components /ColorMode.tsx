import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  //colorMode is a variable that holds the curren color, light or dark
  //toggleColorMode is a function:
  //when it calls it switches the color, when the color mode is light,
  //invoking this function will siwtch it to dark, and vice versa reu

  return (
    <HStack justifyContent="flex-end">
      <Switch //Chakra UI component representing a toggle switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text ml={2}>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
