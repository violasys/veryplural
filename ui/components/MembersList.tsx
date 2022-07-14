import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { SystemMember } from "../types";
import { getOrientation } from "../util/orientation";
import MemberCard from "./MemberCard";

export interface MemberListProps {
  members: SystemMember[];
  showFronting: boolean;
  frontingIds: string[];
  setFronting?: (id: string, fronting: boolean) => void;
}

export default function MembersList(
  props: MemberListProps
): React.ReactElement {
  const [pressedMember, setPressedMember] = useState<string>("");
  const [expanded, setExpanded] = useState<string>("");
  const orientation = getOrientation();
  const fronting = new Set<string>();
  props.frontingIds.forEach((id) => fronting.add(id));

  const renderItem = ({ item }: { item: SystemMember }) => {
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
          showFronting={props.showFronting}
          isFronting={isFronting}
          showDetails={expanded === item.id}
          setFronting={
            props.setFronting
              ? (f) => props.setFronting!(item.id, f)
              : undefined
          }
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      key={`members-${orientation}`}
      data={props.members}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={orientation === "portrait" ? 1 : 2}
      extraData={[pressedMember, expanded]}
    />
  );
}
