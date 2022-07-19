import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Card from "./Card";
import { Text, useThemeColor } from "./Themed";

export default function SelectModal<T>(props: Props<T>) {
  const cancelColor = useThemeColor(
    {
      light: "#cf6679",
      dark: "#cf6679",
    },
    "text"
  );

  const alignment = props.alignment || DEFAULT_ALIGNMENT;

  const optionLabel = (option: Option<T>): string => {
    if (typeof option.label !== "undefined") {
      return option.label;
    }
    return `${option.value}`;
  };

  const optionKey = (option: Option<T>): string => {
    if (typeof option.key !== "undefined") {
      return option.key;
    }
    if (typeof option.label !== "undefined") {
      return option.label;
    }
    return `${option.value}`;
  };

  const style: ViewStyle[] = [
    {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  ];

  style.push(ALIGNMENT_STYLE.get(alignment)!);

  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType={props.animationType || "fade"}
      onRequestClose={() => props.onClose()}
    >
      <View style={style}>
        <Card style={styles.container}>
          {props.title && <Text style={styles.title}>{props.title}</Text>}
          <ScrollView style={{ flex: 1 }}>
            {props.options.map((option) => (
              <SelectOption
                key={optionKey(option)}
                label={optionLabel(option)}
                onSelect={() => props.onClose(option.value)}
                icon={option.icon}
              />
            ))}
          </ScrollView>
          <SelectOption
            label="cancel"
            style={{ borderBottomWidth: 0, color: cancelColor }}
            onSelect={() => {
              props.onClose();
            }}
          />
        </Card>
      </View>
    </Modal>
  );
}

export type Alignment =
  | "center"
  | "top-right"
  | "top"
  | "top-left"
  | "bottom"
  | "left";
const DEFAULT_ALIGNMENT: Alignment = "center";

const ALIGNMENT_STYLE: Map<Alignment, ViewStyle> = (() => {
  const map = new Map<Alignment, ViewStyle>();

  map.set("center", {
    padding: 50,
    justifyContent: "center",
    alignItems: "stretch",
  });

  map.set("top-right", {
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  });

  map.set("top-left", {
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  });

  map.set("top", {
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
  });

  map.set("left", {
    padding: 0,
    marginLeft: -20,
    marginTop: -20,
    marginBottom: -20,
    flexDirection: "row",
    alignItems: "stretch",
  });

  map.set("bottom", {
    padding: 0,
    marginBottom: -20,
    justifyContent: "flex-end",
    alignItems: "stretch",
  });

  return map;
})();

export interface Option<T> {
  label?: string;
  key?: string;
  value: T;
  icon?: (props: { color: string }) => React.ReactElement;
}

interface Props<T> {
  alignment?: Alignment;
  title?: string;
  visible: boolean;
  onClose: (selection?: T) => void;
  options: Option<T>[];
  animationType?: "none" | "slide" | "fade";
}

interface SelectOptionProps {
  label: string;
  onSelect: () => void;
  style?: TextStyle;
  icon?: (props: { color: string }) => React.ReactElement;
}

const SelectOption = (props: SelectOptionProps) => {
  const [pressing, setPressing] = useState<boolean>(false);
  const iconColor = props.style?.color || useThemeColor({}, "text");
  const Icon = props.icon || ((_props: { color: string }) => <></>);
  return (
    <Pressable
      onPress={props.onSelect}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
      style={[styles.option, pressing ? styles.pressed : styles.unpressed]}
    >
      <Icon color={iconColor} />
      <Text style={[styles.optionText, props.style]}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: "normal",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    overflow: "hidden",
  },
  optionText: {
    padding: 10,
    fontSize: 20,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.6,
  },
  unpressed: {},
});
