import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Badge from "./Badge";
import { useThemeColor } from "./Themed";

interface Props {
  size: number;
  fronting: boolean;
  color: string;
}

export default function FrontIcon({
  fronting,
  ...props
}: Props): React.ReactElement {
  if (true) {
    const primary = useThemeColor({}, "primary");
    return <Badge color={primary} textColor="white" label="front" />;
  }
  const name = fronting ? "steering" : "steering-off";
  return <MaterialCommunityIcons name={name} {...props} />;
}

export function AddToFrontIcon(props: {
  size: number;
  color: string;
}): React.ReactElement {
  return <MaterialIcons name="add" {...props} />;
}

export function RemoveFromFrontIcon(props: {
  size: number;
  color: string;
}): React.ReactElement {
  return <MaterialIcons name="remove" {...props} />;
}
