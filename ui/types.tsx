/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { impossible } from "./util/typeutil";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Members: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface SystemMember {
  id: string;
  name: string;
  displayname?: string;
  avatar?: string;
  pronouns?: string;
  color?: string;
  description?: string;
  links?: EntityLink[];
  roles?: string[];
  tags?: string[];
}

export interface FrontingState {
  frontingIds: Set<string>;
  changeFront: (changes: FrontChange[]) => void;
}

type ChangeType = "add" | "remove";

export interface FrontChange {
  memberId: string;
  change: ChangeType;
}

export const applyFrontChange = (set: Set<string>, change: FrontChange) => {
  if (change.change === "add") {
    set.add(change.memberId);
  } else if (change.change === "remove") {
    set.delete(change.memberId);
  } else {
    impossible(change.change);
  }
};

export const simplifyFrontChange = (changes: FrontChange[]): FrontChange[] => {
  const changesByMember = new Map<string, ChangeType>();
  for (const { memberId, change } of changes) {
    if (!changesByMember.has(memberId)) {
      changesByMember.set(memberId, change);
      continue;
    }
    const prev = changesByMember.get(memberId);
    if (prev === change) {
      // no-op
      continue;
    }
    // changes cancel
    changesByMember.delete(memberId);
  }
  const simplified: FrontChange[] = [];
  for (const memberId of changesByMember.keys()) {
    simplified.push({
      memberId,
      change: changesByMember.get(memberId)!!,
    });
  }
  return simplified;
};

export interface EntityLink {
  source: string;
  id: string;
}

export type Comparator<T> = (a: T, b: T) => number;
