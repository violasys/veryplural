import { Button, StyleSheet, View, ViewStyle } from "react-native";

import { Text, useThemeColor } from "../Themed";
import { FrontChange, SystemMember } from "../../types";
import Avi, { Size } from "../Avi";
import Card from "../Card";
import IconButton from "../IconButton";
import Spacer from "../Spacer";
import Ruler from "../Ruler";
import Badge from "../Badge";
import { impossible } from "../../util/typeutil";
import FrontIcon, { AddToFrontIcon, RemoveFromFrontIcon } from "../FrontIcon";
import { MemberCardProps, MemberCardVariant } from "./types";
import { useState } from "react";
import EditingCard from "./EditingCard";

export default function MemberCard(props: MemberCardProps) {
  const [editing, setEditing] = useState<boolean>(false);
  if (editing && !props.editingFront && props.mutable) {
    return (
      <EditingCard
        cancelEdits={() => setEditing(false)}
        saveEdits={(member) => {
          if (member.id !== props.member.id) {
            throw new Error("Cannot change member id while editing");
          }
          // TODO
          setEditing(false);
        }}
        {...props}
      />
    );
  }
  return <MemberCardDisplay startEditing={() => setEditing(true)} {...props} />;
}

interface Props extends MemberCardProps {
  startEditing: () => void;
}

function MemberCardDisplay(props: Props) {
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
            <Text style={styles.name}>{props.member.name}</Text>
            {props.member.pronouns && (
              <Text style={styles.pronouns}>{props.member.pronouns}</Text>
            )}
            {props.member.displayname && showDetails && (
              <Text style={styles.displayname}>{props.member.displayname}</Text>
            )}
          </View>
          <Spacer />
          {props.isFronting && (
            <View
              style={[
                styles.controls,
                showDetails
                  ? {
                      justifyContent: "flex-start",
                    }
                  : {},
              ]}
            >
              <IconButton
                icon={(_) => (
                  <FrontIcon fronting={true} size={32} color={primary} />
                )}
                selected={props.isFronting}
              />
            </View>
          )}
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

function Details(props: Props): React.ReactElement {
  const tags: string[] = [
    ...(props.member.roles || []),
    ...(props.member.tags || []),
  ];
  const buttonColor = useThemeColor({}, "warning");
  return (
    <View style={styles.details}>
      <Text style={styles.description}>{props.member.description}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          alignContent: "stretch",
          marginTop: 8,
        }}
      >
        {tags && (
          <View style={styles.roles}>
            {tags.map((role) => (
              <Badge label={role} color="subtle" />
            ))}
          </View>
        )}
        {!tags && <Spacer />}
        {props.mutable && !props.editingFront && (
          <View
            style={{
              marginLeft: "1em",
              display: "flex",
              alignContent: "stretch",
              justifyContent: "stretch",
              alignItems: "stretch",
            }}
          >
            <Button title="edit" color={buttonColor} />
          </View>
        )}
      </View>
    </View>
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
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "flex-start",
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
    flexShrink: 1,
    overflow: "hidden",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
  },
  pronouns: {
    fontSize: 14,
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
  },
  displayname: {
    fontSize: 14,
    fontWeight: "bold",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
  },
});
