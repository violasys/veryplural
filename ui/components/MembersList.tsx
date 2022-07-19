import { useState } from "react";
import { FlatList, Pressable, useWindowDimensions, View } from "react-native";
import { FrontChange, SystemMember } from "../types";
import { getOrientation } from "../util/orientation";
import MemberCard, { MemberCardVariant } from "./MemberCard";

export interface MemberListProps {
  members: SystemMember[];
  showFronting: boolean;
  frontingIds: string[];
  showAllDetails?: boolean;
  changeFront?: (change: FrontChange) => void;
  variant?: MemberCardVariant;
}

export default function MembersList(
  props: MemberListProps
): React.ReactElement {
  const [pressedMember, setPressedMember] = useState<string>("");
  const [expanded, setExpanded] = useState<string>("");
  const orientation = getOrientation();
  const expandAll = props.showAllDetails || orientation === "landscape";
  const fronting = new Set<string>();
  props.frontingIds.forEach((id) => fronting.add(id));

  const renderItem = ({ item }: { item: SystemMember | 0 }) => {
    if (item === 0) {
      return <View style={{ flex: 1 }} />;
    }
    const isFronting = fronting.has(item.id);
    return (
      <Pressable
        onPress={() => {
          if (expanded !== item.id) {
            setExpanded(item.id);
          } else {
            setExpanded("");
          }
        }}
        onPressIn={() => setPressedMember(item.id)}
        onPressOut={() => setPressedMember("")}
        style={{
          flex: 1,
          opacity: pressedMember === item.id ? 0.6 : 1.0,
        }}
      >
        <MemberCard
          member={item}
          variant={props.variant}
          showFronting={props.showFronting}
          isFronting={isFronting}
          showDetails={expandAll || expanded === item.id}
          changeFront={props.changeFront}
        />
      </Pressable>
    );
  };

  const members: (SystemMember | 0)[] = [...props.members];
  const windowWidth = useWindowDimensions().width;
  const columns =
    orientation === "portrait" ? 1 : 1 + Math.floor(windowWidth / 600);
  while (members.length % columns > 0) {
    members.push(0);
  }

  return (
    <FlatList
      key={`members-${columns}`}
      data={members}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={columns}
      extraData={[pressedMember, expanded]}
    />
  );
}
