import { useState } from "react";
import { StyleSheet } from "react-native";
import SearchableMembersList from "../components/SearchableMembersList";

import { BgView } from "../components/Themed";
import { RootTabScreenProps, SystemMember } from "../types";

export default function MembersScreen({
  navigation,
}: RootTabScreenProps<"Members">) {
  const members: SystemMember[] = [
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

  return (
    <BgView style={styles.container}>
      <SearchableMembersList
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 8,
  },
});
