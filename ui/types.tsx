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

export interface FrontChange {
  memberId: string;
  change: "add" | "remove";
}

export interface EntityLink {
  source: string;
  id: string;
}

export type Comparator<T> = (a: T, b: T) => number;
