import { StyleSheet, View } from "react-native";
import { FgView } from "./Themed";

export default function Card(props: View["props"]) {
  const { style, ...other } = props;
  return <FgView style={[styles.card, style]} {...other} />;
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 8,
    overflow: "hidden",
  },
});
