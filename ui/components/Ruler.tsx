import { View } from "react-native";
import { useThemeColor } from "./Themed";

export default function Ruler(_props: {}): React.ReactElement {
  const color = useThemeColor({}, "text");
  return (
    <View
      style={{
        borderTopColor: color,
        borderTopWidth: 1,
        marginTop: 8,
        marginBottom: 8,
        opacity: 0.5,
      }}
    />
  );
}
