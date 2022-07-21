import { StyleSheet, View } from "react-native";
import { Text } from "./Themed";

interface Props {
  label: string;
  hint?: string;
}

export default function Label(props: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      {props.hint && <Text style={styles.hint}>({props.hint})</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  hint: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "italic",
    marginLeft: 4,
    opacity: 0.6,
  },
});
