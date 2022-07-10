import { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeColor } from "./Themed";

export default function IconButton(props: IconButtonProps): React.ReactElement {
  const color = useThemeColor({}, getColorType(props.selected));
  const [pressed, setPressed] = useState<boolean>(false);
  const Icon = props.icon;

  const style: ViewStyle[] = [styles.container];
  
  if (pressed) {
    style.push(styles.pressed);
  }

  return <Pressable 
  onPressIn={() => setPressed(true)}
  onPressOut={() => setPressed(false)}
  onPress={() => {
    if (typeof props.onPress !== 'undefined') {
        (props.onPress)();
    }
  }}>
    <View style={style}>
      <Icon color={color} />
    </View>
  </Pressable>;
}

export interface IconButtonProps {
    onPress?: () => void,
    selected?: boolean,
    icon: (props: { color: string }) => React.ReactElement,
}

const getColorType = (selected?: boolean) => {
    if (typeof selected === 'undefined') {
        return 'text';
    }
    return !!selected ? 'tabIconSelected' : 'tabIconDefault';
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
    pressed: {
        opacity: 0.6,
    },
  });
  