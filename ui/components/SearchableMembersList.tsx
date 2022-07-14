import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SystemMember } from "../types";
import IconButton from "./IconButton";
import MembersList, {
  MemberListProps as MembersListProps,
} from "./MembersList";
import SelectModal from "./SelectModal";
import { TextInput, useThemeColor } from "./Themed";

interface SearchableMembersListProps extends MembersListProps {}

export default function SearchableMembersList(
  props: SearchableMembersListProps
) {
  const { members: allMembers, ...otherProps } = props;
  const [members, setMembers] = useState<SystemMember[]>([]);
  const [memberFilter, setMemberFilter] = useState<MembersFilter>({
    apply: (x) => x,
  });

  useEffect(() => {
    setMembers(memberFilter.apply(allMembers));
  }, [memberFilter]);

  return (
    <View style={styles.container}>
      <FilterControls setFilter={setMemberFilter} />
      <MembersList members={members} {...otherProps} />
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
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
