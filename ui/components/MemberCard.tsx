import { Appearance, StyleSheet, View, ViewStyle } from "react-native";

import { Text } from "./Themed";
import { FrontChange, SystemMember } from "../types";
import Avi, { Size } from "./Avi";
import Card from "./Card";
import IconButton from "./IconButton";
import Spacer from "./Spacer";
import Ruler from "./Ruler";
import Badge from "./Badge";
import { impossible } from "../util/typeutil";
import FrontIcon, { AddToFrontIcon } from "./FrontIcon";
import SelectModal from "./SelectModal";
import { useState } from "react";

export default function MemberCard(props: MemberCardProps) {
  const variant = (!props.showDetails && props.variant) || "default";
  const [showingFrontChange, setShowingFrontChange] = useState<boolean>(false);
  return (
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
          {!props.editingFront && props.isFronting && (
            <IconButton
              icon={(props) => (
                <FrontIcon fronting={true} size={32} {...props} />
              )}
              selected={props.isFronting}
            />
          )}
          {props.editingFront && (
            <IconButton
              icon={(props) => (
                <FrontIcon fronting={true} size={32} {...props} />
              )}
              offIcon={(props) => (
                <FrontIcon fronting={false} size={32} {...props} />
              )}
              selected={props.isFronting}
              onPress={() => {
                if (typeof props.changeFront === "undefined") {
                  return;
                }
                if (!props.isFronting) {
                  setShowingFrontChange(true);
                  return;
                }
                props.changeFront({
                  memberId: props.member.id,
                  change: props.isFronting ? "remove" : "add",
                });
              }}
            />
          )}
        </View>
        {props.changeFront && (
          <FrontChangeModal
            member={props.member}
            visible={showingFrontChange}
            setVisible={setShowingFrontChange}
            changeFront={props.changeFront}
          />
        )}
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
  isFronting?: boolean;
  changeFront?: (change: FrontChange) => void;
}

interface FrontChangeModalProps
  extends Pick<MemberCardProps, "member" | "isFronting"> {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  changeFront: (change: FrontChange) => void;
}

function FrontChangeModal(props: FrontChangeModalProps): React.ReactElement {
  return (
    <SelectModal<"add" | "set" | "remove">
      visible={props.visible}
      onClose={(change) => {
        if (typeof change !== "undefined") {
          props.changeFront({
            change,
            memberId: props.member.id,
          });
        }
        props.setVisible(false);
      }}
      options={[
        {
          value: "add",
          label: "add to front",
          icon: (props) => <AddToFrontIcon size={24} {...props} />,
        },
        {
          value: "set",
          label: "set as front",
          icon: (props) => <FrontIcon fronting={true} size={24} {...props} />,
        },
      ]}
      animationType="none"
      title={props.member.name}
    />
  );
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
