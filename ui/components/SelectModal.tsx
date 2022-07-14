import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
} from "react-native";
import Card from "./Card";
import Ruler from "./Ruler";
import { Text, useThemeColor } from "./Themed";

export default function SelectModal<T>(props: Props<T>) {
  const cancelColor = useThemeColor(
    {
      light: "#cf6679",
      dark: "#cf6679",
    },
    "text"
  );

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

  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => props.onClose()}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <Card style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            {props.options.map((option) => (
              <>
                <SelectOption
                  key={optionKey(option)}
                  label={optionLabel(option)}
                  onSelect={() => props.onClose(option.value)}
                  icon={option.icon}
                />
                <Ruler />
              </>
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

export interface Option<T> {
  label?: string;
  key?: string;
  value: T;
  icon?: (props: { color: string }) => React.ReactElement;
}

interface Props<T> {
  visible: boolean;
  onClose: (selection?: T) => void;
  options: Option<T>[];
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
    margin: 50,
    borderRadius: 20,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
