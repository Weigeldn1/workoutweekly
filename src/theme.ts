import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    //when applicaition loads, it will start in the dark mode 
   
  }

  const theme = extendTheme({ config })

  export default theme

  //--> this code sets up a Chakra UI theme with an inital color mode of dark. 
  //