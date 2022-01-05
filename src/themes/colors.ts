export interface ColorsPalette {
  background: string,
  primary: string;
  secondary: string;
  highlightPrimary: string;
  highlightSecondary: string;
  shadow: string;
  text: string;
}

export const ColorsDark: ColorsPalette = {
  background: '#0f0f0f',
  primary: '#161323',
  secondary: '#3b3b3b',
  highlightPrimary: '#334756ff',
  highlightSecondary: '#3f596cff',
  shadow: '#222831ff',
  text: 'white'
}

export const ColorsLight: ColorsPalette = {
  background: '#f0f0f0',
  primary: '#e0e0e0',
  secondary: '#949494',
  highlightPrimary: '#334756ff',
  highlightSecondary: '#3f596cff',
  shadow: '#222831ff',
  text: 'white'
}

export default ColorsPalette;