import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  applyFrontChange,
  Comparator,
  FrontChange,
  FrontingState,
  Predicate,
  simplifyFrontChange,
  SystemMember,
} from "../types";
import ActionButtons from "./ActionButtons";
import FrontIcon from "./FrontIcon";
import IconButton from "./IconButton";
import { MemberCardVariant } from "./MemberCard";
import MembersList, {
  MemberListProps as MembersListProps,
} from "./MembersList";
import SelectModal from "./SelectModal";
import { TextInput, useThemeColor } from "./Themed";

interface SearchableMembersListProps extends MembersListProps {}

export default function SearchableMembersList(
  props: SearchableMembersListProps
) {
  const { members: allMembers, frontingState, ...otherProps } = props;
  const [members, setMembers] = useState<SystemMember[]>([]);
  const [memberFilter, setMemberFilter] = useState<MembersFilter>({
    apply: (x) => x,
  });

  useEffect(() => {
    setMembers(memberFilter.apply(allMembers));
  }, [memberFilter]);

  const [editingFront, setEditingFront] = useState<boolean>(false);
  const [frontEdits, setFrontEdits] = useState<FrontChange[]>([]);
  const [variant, _setVariant] = useState<MemberCardVariant>("slim");

  const frontingIds = props.frontingState?.frontingIds || new Set<string>();

  const modifiedFrontingState: FrontingState = {
    frontingIds: (() => {
      const set = new Set(frontingIds);
      frontEdits.forEach((e) => applyFrontChange(set, e));
      return set;
    })(),
    changeFront: (changes: FrontChange[]) => {
      setFrontEdits(simplifyFrontChange([...frontEdits, ...changes]));
    },
  };

  const modifiedFronts = new Set<string>();
  for (const edit of frontEdits) {
    modifiedFronts.add(edit.memberId);
  }

  const commitFrontChanges = () => {
    setEditingFront(false);
    if (frontEdits.length > 0) {
      props.frontingState?.changeFront(frontEdits);
      setFrontEdits([]);
    }
  };

  const clearFront = () => {
    const changes: FrontChange[] = [];
    for (const memberId of frontingIds) {
      changes.push({
        memberId,
        change: "remove",
      });
    }
    setFrontEdits(changes);
  };

  return (
    <View style={styles.container}>
      <FilterControls
        setFilter={setMemberFilter}
        frontingIds={frontingIds}
        editingFront={editingFront}
        setEditingFront={setEditingFront}
        mutable={props.mutable}
      />
      {editingFront && (
        <FrontControls
          commitFrontChanges={commitFrontChanges}
          cancelFrontChanges={() => {
            setEditingFront(false);
            setFrontEdits([]);
          }}
        />
      )}
      <MembersList
        members={members}
        variant={variant}
        editingFront={editingFront}
        frontingState={modifiedFrontingState}
        modifiedFronts={modifiedFronts}
        {...otherProps}
      />
      {editingFront && <ClearFrontControls clearFront={clearFront} />}
    </View>
  );
}

interface ClearFrontProps {
  clearFront: () => void;
}

const ClearFrontControls = (props: ClearFrontProps): React.ReactElement => {
  const clearColor = useThemeColor({}, "primary");
  return (
    <View
      style={{
        marginTop: 8,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}>
        <Button
          title="clear front"
          onPress={props.clearFront}
          color={clearColor}
        />
      </View>
    </View>
  );
};

interface FrontControlsProps {
  cancelFrontChanges: () => void;
  commitFrontChanges: () => void;
}

const FrontControls = (props: FrontControlsProps): React.ReactElement => {
  return (
    <ActionButtons
      actionText="save front changes"
      onAction={props.commitFrontChanges}
      onCancel={props.cancelFrontChanges}
      style={{ padding: 8 }}
    />
  );
};

interface MembersFilter {
  apply: (members: SystemMember[]) => SystemMember[];
}

interface FilterControlsProps {
  frontingIds: Set<string>;
  setFilter: (filter: MembersFilter) => void;
  editingFront: boolean;
  setEditingFront: (editing: boolean) => void;
  mutable?: boolean;
}

type SortMode = "Alphabetical" | "Fronting";
const SORT_MODES: SortMode[] = ["Alphabetical", "Fronting"];

const FilterControls = (props: FilterControlsProps): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [sortMode, setSortMode] = useState<SortMode>(SORT_MODES[0]);
  const [showingSortModal, setShowingSortModal] = useState<boolean>(false);
  const { editingFront, setEditingFront } = props;
  const primaryColor = useThemeColor({}, "primary");

  const createFilter =
    (searchText: string): Predicate<SystemMember> =>
    (member: SystemMember) => {
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
    const af = props.frontingIds.has(a.id);
    const bf = props.frontingIds.has(b.id);
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
      <View
        style={{
          display: "flex",
          flex: 1,
          flexShrink: 1,
          alignContent: "stretch",
          alignItems: "stretch",
        }}
      >
        <TextInput
          style={styles.search}
          placeholder="Search"
          onChangeText={(text) =>
            setSearchText(text.trim().toLocaleLowerCase())
          }
        />
      </View>
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
      {!editingFront && props.mutable && (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Button
            title="edit front"
            color={primaryColor}
            onPress={() => setEditingFront(true)}
          />
        </View>
      )}
      {!true && (
        <IconButton
          icon={(props) => <Ionicons size={26} name="grid" {...props} />}
          selected={true}
        />
      )}
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
    overflow: "hidden",
  },
  search: {
    flex: 1,
    fontSize: 20,
    padding: 8,
    flexShrink: 1,
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
