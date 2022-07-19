import { useState } from "react";
import { StyleSheet } from "react-native";
import SearchableMembersList from "../components/SearchableMembersList";

import { BgView } from "../components/Themed";
import { FrontChange, RootTabScreenProps, SystemMember } from "../types";
import { impossible } from "../util/typeutil";

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
      roles: ["host", "amnesian protector"],
      tags: ["age-slider"],
      color: "#aa11aa",
    },
    {
      id: "demi",
      name: "Demi",
      avatar: "https://violasys.github.io/assets/images/pfp-gwen-demi.png",
      pronouns: "She/They",
      roles: ["host", "worker", "protector"],
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
        frontingIds={fronting}
        showFronting={true}
        changeFront={({ memberId, change }: FrontChange) => {
          if (change === "add") {
            setFronting([memberId, ...fronting]);
            return;
          }
          if (change === "remove") {
            setFronting(fronting.filter((x) => x !== memberId));
            return;
          }
          if (change === "set") {
            setFronting([memberId]);
            return;
          }
          impossible(change);
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
