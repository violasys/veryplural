import { View } from "react-native";
import { useThemeColor } from "./Themed";

export default function Ruler(_props: {}): React.ReactElement {
  const color = useThemeColor({}, "text");
  return (
    <View
      style={{
        borderTopColor: color,
        borderTopWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        opacity: 0.5,
      }}
    />
  );
}
