import { useState } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import { impossible } from "../util/typeutil";
import { useThemeColor } from "./Themed";

export default function IconButton(props: IconButtonProps): React.ReactElement {
  const color = useThemeColor({}, getColorType(props.selected));
  const [pressed, setPressed] = useState<boolean>(false);
  const Icon =
    props.selected || typeof props.offIcon === "undefined"
      ? props.icon
      : props.offIcon!;

  const style: ViewStyle[] = [styles.container];

  if (pressed) {
    style.push(styles.pressed);
  }

  if (props.bordered) {
    const theme = useColorScheme();
    if (theme === "light") {
      style.push(styles.borderedLight);
    } else if (theme === "dark") {
      style.push(styles.borderedDark);
    } else {
      impossible(theme);
    }
  }

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => {
        if (typeof props.onPress !== "undefined") {
          props.onPress();
        }
      }}
    >
      <View style={style}>
        <Icon color={color} />
        {props.text && (
          <Text style={[styles.text, { color }]}>{props.text}</Text>
        )}
      </View>
    </Pressable>
  );
}

export interface IconButtonProps {
  onPress?: () => void;
  selected?: boolean;
  text?: string;
  icon: (props: { color: string }) => React.ReactElement;
  offIcon?: (props: { color: string }) => React.ReactElement;
  bordered?: boolean;
}

const getColorType = (selected?: boolean) => {
  if (typeof selected === "undefined") {
    return "text";
  }
  return !!selected ? "tabIconSelected" : "tabIconDefault";
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
  },
  borderedLight: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#c6c6c6",
    borderWidth: 1,
  },
  borderedDark: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#121212",
  },
});
