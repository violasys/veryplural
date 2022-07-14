import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { SystemMember } from "../types";
import { getOrientation } from "../util/orientation";
import MemberCard from "./MemberCard";

export interface MemberListProps {
  members: SystemMember[];
  showFronting: boolean;
  frontingIds: string[];
  showAllDetails?: boolean;
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
          showFronting={props.showFronting}
          isFronting={isFronting}
          showDetails={props.showAllDetails || expanded === item.id}
          setFronting={
            props.setFronting
              ? (f) => props.setFronting!(item.id, f)
              : undefined
          }
        />
      </Pressable>
    );
  };

  const members: (SystemMember | 0)[] = [...props.members];
  if (orientation === "landscape" && members.length % 2 === 1) {
    members.push(0);
  }

  return (
    <FlatList
      key={`members-${orientation}`}
      data={members}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={orientation === "portrait" ? 1 : 2}
      extraData={[pressedMember, expanded]}
    />
  );
}
