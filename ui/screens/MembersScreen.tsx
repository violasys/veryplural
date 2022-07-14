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
      color: "#aa2222",
      roles: ["trauma holder"],
    },
    {
      id: "gwen",
      name: "Gwen",
      avatar: "https://violasys.github.io/assets/images/pfp-gwen.png",
      pronouns: "She/Her",
      roles: ["host"],
      color: "#881188",
    },
    {
      id: "melanie",
      name: "Melanie",
      avatar: "https://violasys.github.io/assets/images/pfp-melanie.png",
      pronouns: "She/Her",
      roles: ["worker"],
    },
    {
      id: "caroline",
      name: "Caroline",
      avatar: "https://violasys.github.io/assets/images/pfp-caroline.png",
      pronouns: "She/Her",
      roles: ["former host"],
      tags: ["middle"],
      color: "#00ffff",
    },
    {
      id: "gwen-mem",
      name: "Morrigan",
      avatar: "https://violasys.github.io/assets/images/pfp-gwen-mem.png",
      pronouns: "She/They",
      roles: ["gatekeeper", "eraser", "architect"],
      color: "#000000",
    },
    {
      id: "lilah",
      name: "Lilah",
      avatar: "https://violasys.github.io/assets/images/pfp-gwen-lilah.png",
      pronouns: "She/Her",
      roles: ["co-host", "amnesian protector"],
      color: "#aa11aa",
    },
    {
      id: "demi",
      name: "Demi",
      avatar: "https://violasys.github.io/assets/images/pfp-gwen-demi.png",
      pronouns: "She/They",
      roles: ["co-host", "worker", "protector"],
      color: "#aa11aa",
    },
    {
      id: "jan",
      name: "Jan",
      pronouns: "They/Them",
      roles: ["former host"],
      color: "#116611",
    },
  ];

  const [fronting, setFronting] = useState(["demi", "gwen"]);

  return (
    <BgView style={styles.container}>
      <SearchableMembersList
        members={members}
        showAllDetails={true}
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
