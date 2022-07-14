import { Image, StyleSheet, View, ViewStyle } from "react-native";

export default function Avi(props: AviProps) {
  const placeholder = require("../assets/images/avi.png");
  const source = props.uri ? { uri: props.uri } : placeholder;
  const size = interpretSize(props.size);
  const style: ViewStyle[] = [styles.container];
  if (typeof props.color !== "undefined" && props.color !== "") {
    style.push({
      // borderColor: props.color,
      // borderLeftWidth: 4,
      // borderBottomWidth: 4,
      // borderTopWidth: 0,
      // borderRightWidth: 0,
      shadowColor: props.color,
      shadowRadius: 0,
      shadowOffset: {
        width: -4,
        height: 4,
      },
    });
  }
  return (
    <View style={style}>
      <Image
        source={source}
        loadingIndicatorSource={placeholder}
        style={{
          width: size,
          height: size,
        }}
      ></Image>
    </View>
  );
}

export type Size = "small" | "medium" | "large";

export interface AviProps {
  uri?: string;
  size?: Size;
  color?: string;
}

const interpretSize = (size: Size | undefined): number => {
  if (typeof size === "undefined") return interpretSize("medium");
  if (size === "small") return 24;
  if (size === "medium") return 64;
  if (size === "large") return 512;
  throw Error(`Unknown size ${size}`);
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 8,
    margin: 5,
    backgroundColor: "#888888",
  },
});
