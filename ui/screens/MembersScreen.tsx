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
      displayname: "Alice (They/She) | Viola System",
      roles: ["gatekeeper", "caretaker"],
      tags: ["one", "two", "three", "four", "five", "six", "seven"],
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
      avatar: "https://violasys.github.io/assets/images/pfp-morrigan.png",
      pronouns: "She/They",
      roles: ["gatekeeper", "eraser", "architect"],
      color: "#000000",
    },
    {
      id: "lilah",
      name: "Lilah",
      avatar: "https://violasys.github.io/assets/images/pfp-lilah.png",
      pronouns: "She/Her",
      roles: ["host", "amnesian protector"],
      tags: ["age-slider"],
      color: "#aa11aa",
    },
    {
      id: "demi",
      name: "Demi",
      avatar: "https://violasys.github.io/assets/images/pfp-demi.png",
      pronouns: "She/They",
      roles: ["host", "worker", "protector"],
      color: "#aa11aa",
    },
    {
      id: "jan",
      name: "Jan",
      avatar: "https://violasys.github.io/assets/images/pfp-jan.png",
      pronouns: "They/Them",
      roles: ["former host"],
      color: "#116611",
    },
    {
      id: "emily",
      name: "Emily",
      avatar: "https://violasys.github.io/assets/images/pfp-emily.jpg",
      pronouns: "She/Her",
      roles: [],
      color: "#88ccdd",
    },
  ];
  const [fronting, setFronting] = useState(new Set<string>(["alice", "gwen"]));

  return (
    <BgView style={styles.container}>
      <SearchableMembersList
        members={members}
        mutable={true}
        frontingState={{
          frontingIds: fronting,
          changeFront: (changes) => {
            const set = new Set<string>(fronting);
            for (const { memberId, change } of changes) {
              if (change === "add") {
                set.add(memberId);
              } else if (change === "remove") {
                set.delete(memberId);
              } else {
                impossible(change);
              }
            }
            setFronting(set);
          },
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
