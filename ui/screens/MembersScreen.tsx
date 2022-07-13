import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import MemberCard from "../components/MemberCard";
import SelectModal from "../components/SelectModal";

import { BgView, Text, TextInput, useThemeColor } from "../components/Themed";
import { RootTabScreenProps, SystemMember } from "../types";
import { getOrientation } from "../util/orientation";

export default function MembersScreen({
  navigation,
}: RootTabScreenProps<"Members">) {
  const [members, setMembers] = useState<SystemMember[]>([]);
  const [memberFilter, setMemberFilter] = useState<MembersFilter>({
    apply: (x) => x,
  });

  const allMembers: SystemMember[] = [
    {
      id: "alice",
      name: "Alice",
      avatar: "https://violasys.github.io/assets/images/pfp-alice2.png",
      pronouns: "They/She",
      roles: ["gatekeeper", "caretaker"],
    },
    {
      id: "ria",
      name: "Ria",
      avatar: "https://violasys.github.io/assets/images/pfp-ria2s.png",
      pronouns: "She/Her",
      description: "hi this is some placeholder text",
    },
    {
      id: "gwen",
      name: "Gwen",
      avatar: "https://violasys.github.io/assets/images/pfp-gwen.png",
      pronouns: "She/Her",
      roles: ["host"],
    },
    {
      id: "melanie",
      name: "Melanie",
      avatar: "https://violasys.github.io/assets/images/pfp-melanie.png",
      pronouns: "She/Her",
    },
    {
      id: "caroline",
      name: "Caroline",
      avatar: "https://violasys.github.io/assets/images/pfp-caroline.png",
      pronouns: "She/Her",
      roles: ["former host"],
      tags: ["middle"],
    },
    {
      id: "gwen-mem",
      name: "Morrigan",
      avatar: "https://violasys.github.io/assets/images/pfp-gwen-mem.png",
      pronouns: "She/They",
      roles: ["gatekeeper"],
    },
  ];

  const [fronting, setFronting] = useState(["demi", "gwen"]);

  useEffect(() => {
    setMembers(memberFilter.apply(allMembers));
  }, [memberFilter]);

  return (
    <BgView style={styles.container}>
      <FilterControls setFilter={setMemberFilter} />
      <MemberList
        members={members}
        frontingIds={fronting}
        showFronting={true}
        setFronting={(id: string, f: boolean) => {
          if (f) {
            setFronting([id, ...fronting]);
          } else {
            setFronting(fronting.filter((i) => i !== id));
          }
        }}
      />
    </BgView>
  );
}

interface MembersFilter {
  apply: (members: SystemMember[]) => SystemMember[];
}

interface FilterControlsProps {
  setFilter: (filter: MembersFilter) => void;
}

const FilterControls = (props: FilterControlsProps): React.ReactElement => {
  const color = useThemeColor({}, "text");

  const createFilter = (searchText: string): MembersFilter => {
    const apply = (members: SystemMember[]) =>
      members.filter((member: SystemMember) => {
        const fields = [
          member.id,
          member.name,
          member.displayname || "",
          member.description || "",
          member.pronouns || "",
        ];
        (member.roles || []).forEach((role) => fields.push(role));
        (member.tags || []).forEach((tag) => fields.push(tag));
        return fields.some(
          (f) => f.toLocaleLowerCase().indexOf(searchText) >= 0
        );
      });
    return { apply };
  };

  const [showingFilterModal, setShowingFilterModal] = useState<boolean>(false);

  return (
    <View style={styles.filterView}>
      <SelectModal
        visible={showingFilterModal}
        onClose={(f) => {
          setShowingFilterModal(false);
        }}
        options={[{ value: "all" }]}
      />
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={(text) => {
          props.setFilter(createFilter(text.trim().toLocaleLowerCase()));
        }}
      />
      <IconButton
        icon={(props) => <Ionicons size={26} name="filter" {...props} />}
        onPress={() => setShowingFilterModal(true)}
      />
      <IconButton
        icon={(props) => <Ionicons size={26} name="grid" {...props} />}
        selected={true}
      />
    </View>
  );
};

interface MemberListProps {
  members: SystemMember[];
  showFronting: boolean;
  frontingIds: string[];
  setFronting?: (id: string, fronting: boolean) => void;
}

const MemberList = (props: MemberListProps): React.ReactElement => {
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
          setExpanded(item.id);
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 8,
  },
  filterView: {
    display: "flex",
    flexDirection: "row",
    alignContent: "stretch",
    margin: 8,
  },
  search: {
    flex: 1,
    fontSize: 20,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
