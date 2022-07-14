import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { useThemeColor } from "./Themed";

export default function Badge(props: Props): React.ReactElement {
  const colorStyle = getColorStyle(props.color || "default");
  return (
    <Text style={[styles.badge, colorStyle]}>
      {props.label.toLocaleUpperCase()}
    </Text>
  );
}

interface Props {
  label: string;
  color?: BadgeColor;
}

export type BadgeColor = "default" | "subtle";

const getColorStyle = (c: BadgeColor): TextStyle => {
  if (c === "default") {
    return {
      color: "rgb(26, 32, 44)",
      backgroundColor: "rgb(237, 242, 247)",
    };
  }
  if (c === "subtle") {
    return {
      color: "rgba(26, 32, 44, 0.8)",
      backgroundColor: "rgba(237, 242, 247, 0.8)",
    };
  }
  throw Error(`Unknown badge color ${c}`);
};

const styles = StyleSheet.create({
  badge: {
    fontSize: 12,
    paddingLeft: 4,
    paddingRight: 4,
    margin: 2,
    fontWeight: "bold",
    borderRadius: 2,
    overflow: "hidden",
  },
});
