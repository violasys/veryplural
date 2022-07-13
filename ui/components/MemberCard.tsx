import { Appearance, StyleSheet, View } from "react-native";

import { Text } from "./Themed";
import { SystemMember } from "../types";
import Avi from "./Avi";
import Card from "./Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import Spacer from "./Spacer";
import Ruler from "./Ruler";

export default function MemberCard(props: MemberCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.main}>
        <Avi uri={props.member.avatar} />
        <View style={[styles.namebox]}>
          <Text style={styles.name}>
            {props.member.displayname || props.member.name}
          </Text>
          {props.member.pronouns && (
            <Text style={styles.pronouns}>{props.member.pronouns}</Text>
          )}
        </View>
        <Spacer />
        <View style={styles.controls}>
          {props.showFronting && (
            <IconButton
              icon={(props) => (
                <MaterialCommunityIcons name="steering" size={32} {...props} />
              )}
              offIcon={(props) => (
                <MaterialCommunityIcons
                  name="steering-off"
                  size={32}
                  {...props}
                />
              )}
              selected={props.isFronting}
              onPress={() => {
                if (typeof props.setFronting === "undefined") {
                  return;
                }
                props.setFronting(!props.isFronting);
              }}
            />
          )}
        </View>
      </View>
      {props.showDetails && (
        <>
          <Ruler />
          <Details {...props} />
        </>
      )}
    </Card>
  );
}

function Details(props: MemberCardProps): React.ReactElement {
  return (
    <View style={styles.details}>
      <Text>{props.member.description}</Text>
    </View>
  );
}

export interface MemberCardProps {
  member: SystemMember;
  showDetails?: boolean;
  showFronting?: boolean;
  isFronting?: boolean;
  setFronting?: (fronting: boolean) => void;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  namebox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)",
    marginLeft: 10,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pronouns: {
    fontSize: 16,
  },
});
