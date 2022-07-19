import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

interface Props {
  size: number;
  fronting: boolean;
  color: string;
}

export default function FrontIcon({
  fronting,
  ...props
}: Props): React.ReactElement {
  const name = fronting ? "steering" : "steering-off";
  return <MaterialCommunityIcons name={name} {...props} />;
}

export function AddToFrontIcon(props: {
  size: number;
  color: string;
}): React.ReactElement {
  return <MaterialIcons name="add" {...props} />;
}
