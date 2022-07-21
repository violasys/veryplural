import { SystemMember } from "../../types";
import Card from "../Card";
import { MemberCardProps } from "./types";

interface EditingProps extends MemberCardProps {
  cancelEdits: () => void;
  saveEdits: (member: SystemMember) => void;
}

export default function EditingCard(props: EditingProps): React.ReactElement {
  return <Card>asdf</Card>;
}
