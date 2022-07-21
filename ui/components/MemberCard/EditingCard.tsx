import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SystemMember } from "../../types";
import ActionButtons from "../ActionButtons";
import Avi from "../Avi";
import Card from "../Card";
import Label from "../Label";
import { TextInput, useThemeColor } from "../Themed";
import { MemberCardProps } from "./types";

interface EditingProps extends MemberCardProps {
  cancelEdits: () => void;
  saveEdits: (member: SystemMember) => void;
}

export default function EditingCard(props: EditingProps): React.ReactElement {
  const [name, setName] = useState<string>(props.member.name);
  const [pronouns, setPronouns] = useState<string>(props.member.pronouns || "");
  const [displayname, setDisplayName] = useState<string>(
    props.member.displayname || ""
  );
  const [avatar, setAvatar] = useState<string>(props.member.avatar || "");
  const [color, setColor] = useState<string>(props.member.color || "");
  const [description, setDescription] = useState<string>(
    props.member.description || ""
  );
  const [notes, setNotes] = useState<string>(props.member.notes || "");
  const [tags, setTags] = useState<string[]>(props.member.tags || []);
  const [roles, setRoles] = useState<string[]>(props.member.roles || []);
  // TODO: privacy level dropdown

  const resetForm = () => {
    setName(props.member.name);
    setPronouns(props.member.pronouns || "");
    setDisplayName(props.member.displayname || "");
    setAvatar(props.member.avatar || "");
    setColor(props.member.color || "");
    setDescription(props.member.description || "");
    setNotes(props.member.notes || "");
    setTags(props.member.tags || []);
    setRoles(props.member.roles || []);
  };

  const constructMember = (): SystemMember => ({
    ...props.member,
    name,
    pronouns,
    displayname,
    avatar,
    color,
    description,
    notes,
    tags,
    roles,
  });

  return (
    <Card style={styles.card}>
      <View style={styles.aviContainer}>
        <AviEdit
          avatar={avatar}
          color={color}
          setAvatar={setAvatar}
          setColor={setColor}
        />
        <View style={[styles.form, { marginLeft: 8, flex: 1 }]}>
          <Label label="Name" />
          <InputTextField initial={name} update={setName} />
          <Label label="Pronouns" />
          <InputTextField initial={pronouns} update={setPronouns} />
          <Label label="Display Name (PK)" />
          <InputTextField initial={displayname} update={setDisplayName} />
        </View>
      </View>
      <Label label="Description" />
      <InputTextField
        initial={description}
        update={setDescription}
        multiline={true}
      />
      <Label label="Private Notes" hint="only visible to your system" />
      <InputTextField initial={notes} update={setNotes} multiline={true} />
      <Label label="Roles" hint="separate with commas" />
      <TokenField initial={roles} update={setRoles} />
      <Label label="Tags" hint="separate with commas" />
      <TokenField initial={tags} update={setTags} />
      <ActionButtons
        actionText="save"
        onAction={() => {
          // TODO
          const member = constructMember();
          console.log(member);
        }}
        onCancel={() => {
          resetForm();
          props.cancelEdits();
        }}
        style={{ marginTop: 4 }}
      />
    </Card>
  );
}

interface EditAviProps {
  avatar: string;
  color: string;
  setAvatar: (uri: string) => void;
  setColor: (uri: string) => void;
}

const AviEdit = (props: EditAviProps): React.ReactElement => {
  const buttonColor = useThemeColor({}, "primary");
  return (
    <View
      style={{
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Avi uri={props.avatar} size="large" color={props.color} />
      <View
        style={{
          marginTop: 4,
          marginBottom: 4,
          flex: 1,
        }}
      >
        <Button title="edit avatar" color={buttonColor} />
      </View>
    </View>
  );
};

interface TokenFieldProps {
  initial: string[];
  update: (value: string[]) => void;
}

const TokenField = (props: TokenFieldProps) => {
  return (
    <InputTextField
      initial={props.initial.join(", ")}
      update={(text) =>
        props.update(
          text
            .trim()
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        )
      }
    />
  );
};

interface InputTextFieldProps {
  initial: string;
  update: (value: string) => void;
  multiline?: boolean;
}

const InputTextField = (props: InputTextFieldProps) => {
  return (
    <TextInput
      defaultValue={props.initial}
      onChangeText={props.update}
      style={{
        padding: 4,
        borderRadius: 4,
        marginBottom: 4,
      }}
      numberOfLines={props.multiline ? 6 : undefined}
      multiline={props.multiline}
      scrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
  },
  aviContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignContent: "stretch",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
