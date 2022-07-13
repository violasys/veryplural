import { StyleSheet, View } from "react-native";

export default function Spacer(_props: {}) {
  return <View style={sheets.spacer} />;
}

const sheets = StyleSheet.create({
  spacer: {
    flexGrow: 1,
  },
});
