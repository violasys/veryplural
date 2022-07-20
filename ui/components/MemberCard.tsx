import { Appearance, StyleSheet, View, ViewStyle } from "react-native";

import { Text, useThemeColor } from "./Themed";
import { FrontChange, SystemMember } from "../types";
import Avi, { Size } from "./Avi";
import Card from "./Card";
import IconButton from "./IconButton";
import Spacer from "./Spacer";
import Ruler from "./Ruler";
import Badge from "./Badge";
import { impossible } from "../util/typeutil";
import FrontIcon, { AddToFrontIcon, RemoveFromFrontIcon } from "./FrontIcon";

export default function MemberCard(props: MemberCardProps) {
  const showDetails = props.showDetails && !props.editingFront;
  const variant = (!showDetails && props.variant) || "default";
  const text = useThemeColor({}, "text");
  const primary = useThemeColor({}, "tabIconSelected");
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Card style={[styles.card, getVariantStyle(variant)]}>
        <View style={styles.main}>
          <Avi
            size={getAviSize(variant)}
            uri={props.member.avatar}
            color={props.member.color}
          />
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
            {props.isFronting && (
              <IconButton
                icon={(_) => (
                  <FrontIcon fronting={true} size={32} color={primary} />
                )}
                selected={props.isFronting}
              />
            )}
          </View>
        </View>
        {showDetails && (
          <>
            <Ruler />
            <Details {...props} />
          </>
        )}
      </Card>

      {props.editingFront && (
        <Card
          style={[
            styles.card,
            getVariantStyle(variant),
            {
              flex: 0,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 30,
              paddingRight: 30,
              marginLeft: 0,
            },
          ]}
        >
          <IconButton
            icon={(_) => {
              if (!props.isFronting) {
                return <AddToFrontIcon size={32} color={text} />;
              }
              return <RemoveFromFrontIcon size={32} color={text} />;
            }}
            selected={props.modifiedFront || undefined}
            onPress={() => {
              if (!props.changeFront) return;
              props.changeFront({
                memberId: props.member.id,
                change: props.isFronting ? "remove" : "add",
              });
            }}
          />
        </Card>
      )}
    </View>
  );
}

const getVariantStyle = (v: MemberCardVariant): ViewStyle => {
  if (v === "default") {
    return styles.cardDefault;
  }
  if (v === "slim") {
    return styles.cardSlim;
  }
  impossible(v);
};

const getAviSize = (v: MemberCardVariant): Size => {
  if (v === "default") return "medium";
  if (v === "slim") return "slim";
  impossible(v);
};

function Details(props: MemberCardProps): React.ReactElement {
  const tags: string[] = [
    ...(props.member.roles || []),
    ...(props.member.tags || []),
  ];
  return (
    <View style={styles.details}>
      <Text style={styles.description}>{props.member.description}</Text>
      {tags && (
        <View style={styles.roles}>
          {tags.map((role) => (
            <Badge label={role} color="subtle" />
          ))}
        </View>
      )}
    </View>
  );
}

export type MemberCardVariant = "default" | "slim";

export interface MemberCardProps {
  member: SystemMember;
  showDetails?: boolean;
  variant?: MemberCardVariant;
  editingFront?: boolean;
  modifiedFront?: boolean;
  isFronting?: boolean;
  changeFront?: (change: FrontChange) => void;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  cardDefault: {},
  cardSlim: {
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  roles: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
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
