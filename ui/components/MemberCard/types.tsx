import { FrontChange, SystemMember } from "../../types";

export type MemberCardVariant = "default" | "slim";

export interface MemberCardProps {
  member: SystemMember;
  showDetails?: boolean;
  variant?: MemberCardVariant;
  editingFront?: boolean;
  modifiedFront?: boolean;
  isFronting?: boolean;
  changeFront?: (change: FrontChange) => void;
  mutable?: boolean;
}
