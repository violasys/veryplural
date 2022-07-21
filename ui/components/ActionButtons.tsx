import { Button, View, ViewStyle } from "react-native";
import { useThemeColor } from "./Themed";

export default function ActionButtons(props: Props): React.ReactElement {
  const secondaryColor = useThemeColor({}, "tabIconDefault");
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View
      style={[
        {
          flexDirection: "column",
          alignContent: "stretch",
          alignItems: "stretch",
        },
        props.style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, marginRight: 4 }}>
          <Button
            title={props.cancelText || "cancel"}
            onPress={props.onCancel}
            color={secondaryColor}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Button
            title={props.actionText}
            onPress={props.onAction}
            color={primaryColor}
          />
        </View>
      </View>
    </View>
  );
}

export interface Props {
  onAction: () => void;
  onCancel: () => void;
  actionText: string;
  cancelText?: string;
  style?: ViewStyle;
}
