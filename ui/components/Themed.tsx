/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function BgView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}


export function FgView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'foreground');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');

  const theme = useColorScheme();
  const borderProps = theme === 'light' ? {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 8,
  } : { borderWidth: 0 };

  return <DefaultView style={[{ 
    backgroundColor, 
    borderColor,
  }, borderProps, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ 
    light: lightColor, 
    dark: darkColor 
  }, 'text');
  const backgroundColor = useThemeColor({ 
    light: lightColor, 
    dark: darkColor
  }, 'background');
  const borderColor = useThemeColor({ 
    light: lightColor, 
    dark: darkColor
  }, 'borderColor');


  return <DefaultTextInput style={[{
     color, 
     backgroundColor,
     borderColor,
     borderWidth: 1,
     borderRadius: 8,
    }, style]} {...otherProps} />;
}
