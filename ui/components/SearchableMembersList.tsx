import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Comparator, Predicate, SystemMember } from "../types";
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
      <FilterControls
        setFilter={setMemberFilter}
        frontingIds={otherProps.frontingIds}
      />
      <MembersList members={members} {...otherProps} />
    </View>
  );
}

interface MembersFilter {
  apply: (members: SystemMember[]) => SystemMember[];
}

interface FilterControlsProps {
  frontingIds: string[];
  setFilter: (filter: MembersFilter) => void;
}

type SortMode = "Alphabetical" | "Fronting";
const SORT_MODES: SortMode[] = ["Fronting", "Alphabetical"];

const FilterControls = (props: FilterControlsProps): React.ReactElement => {
  const color = useThemeColor({}, "text");

  const [searchText, setSearchText] = useState<string>("");
  const [sortMode, setSortMode] = useState<SortMode>(SORT_MODES[0]);
  const [showingSortModal, setShowingSortModal] = useState<boolean>(false);

  const createFilter =
    (searchText: string): Predicate<SystemMember> =>
    (member) => {
      const fields = [
        member.name,
        member.displayname || "",
        member.pronouns || "",
      ];
      (member.roles || []).forEach((role) => fields.push(role));
      (member.tags || []).forEach((tag) => fields.push(tag));
      return fields.some((f) => f.toLocaleLowerCase().indexOf(searchText) == 0);
    };

  const comparators = new Map<SortMode, Comparator<SystemMember>>();
  comparators.set("Alphabetical", (a, b) =>
    (a.displayname || a.name).localeCompare(b.displayname || b.name)
  );
  comparators.set("Fronting", (a, b) => {
    const af = props.frontingIds.some((id) => id === a.id);
    const bf = props.frontingIds.some((id) => id === b.id);
    if (af === bf) {
      return comparators.get("Alphabetical")!(a, b);
    }
    return af ? -1 : 1;
  });

  const sortIcons = new Map<
    SortMode,
    Pick<MaterialCommunityIcons["props"], "name">
  >();
  sortIcons.set("Alphabetical", { name: "sort-alphabetical-ascending" });
  sortIcons.set("Fronting", { name: "steering" });

  const createComparator = (
    sortMode: SortMode
  ): ((a: SystemMember, b: SystemMember) => number) => {
    return comparators.get(sortMode)!;
  };

  const createTransform = (
    searchText: string,
    sortMode: SortMode
  ): MembersFilter => {
    const apply = (members: SystemMember[]) => {
      const filtered = members.filter(createFilter(searchText));
      filtered.sort(createComparator(sortMode));
      return filtered;
    };
    return { apply };
  };

  useEffect(() => {
    props.setFilter(createTransform(searchText, sortMode));
  }, [searchText, sortMode, props.frontingIds]);

  return (
    <View style={styles.filterView}>
      <SelectModal<SortMode>
        title="Sort by ..."
        alignment="top-right"
        visible={showingSortModal}
        onClose={(choice) => {
          setShowingSortModal(false);
          if (typeof choice !== "undefined") {
            setSortMode(choice);
          }
        }}
        options={SORT_MODES.map((mode: SortMode) => ({
          value: mode,
          icon: (props: { color: string }) => (
            <MaterialCommunityIcons
              size={20}
              name={sortIcons.get(mode)!.name}
              {...props}
            />
          ),
        }))}
      />
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={(text) => setSearchText(text.trim().toLocaleLowerCase())}
      />
      <IconButton
        icon={(props) => (
          <MaterialCommunityIcons
            size={26}
            name={sortIcons.get(sortMode)!.name}
            {...props}
          />
        )}
        onPress={() => setShowingSortModal(true)}
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
