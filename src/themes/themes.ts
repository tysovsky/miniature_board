import { useColorScheme } from "react-native"
import { registerThemes } from "react-native-themed-styles"
 
import { ColorsDark, ColorsLight } from "./colors";
import Dimensions from "./dimensions";

const light = { colors: ColorsLight, dimension: Dimensions }
const dark = { colors: ColorsDark, dimension: Dimensions }
 
const styleSheetFactory = registerThemes({ light, dark }, () => {
  const colorScheme = useColorScheme();

  if (colorScheme == 'dark') return 'dark';
  if (colorScheme == 'light') return 'light';

  return 'light';
});
 
export { styleSheetFactory }