import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import MemberCard from '../components/MemberCard';

import { BgView, TextInput } from '../components/Themed';
import { RootTabScreenProps, SystemMember } from '../types';
import { getOrientation } from '../util/orientation';

export default function MembersScreen({ navigation }: RootTabScreenProps<'Members'>) {
  const [members, setMembers] = useState<SystemMember[]>([]);
  const [memberFilter, setMemberFilter] = useState<MembersFilter>({ apply: (x) => x });
  
  const allMembers: SystemMember[] = [{
    id: 'alice',
    name: 'Alice',
    avatar: 'https://violasys.github.io/assets/images/pfp-alice2.png',
    pronouns: 'They/She',
    roles: ['gatekeeper', 'caretaker'],
  },{
    id: 'ria',
    name: 'Ria',
    avatar: 'https://violasys.github.io/assets/images/pfp-ria2s.png',
    pronouns: 'She/Her',
  },{
    id: 'gwen',
    name: 'Gwen',
    avatar: 'https://violasys.github.io/assets/images/pfp-gwen.png',
    pronouns: 'She/Her',
    roles: ['host'],
  },{
    id: 'melanie',
    name: 'Melanie',
    avatar: 'https://violasys.github.io/assets/images/pfp-melanie.png',
    pronouns: 'She/Her',
  },{
    id: 'caroline',
    name: 'Caroline',
    avatar: 'https://violasys.github.io/assets/images/pfp-caroline.png',
    pronouns: 'She/Her',
    roles: ['former host'],
    tags: ['middle'],
  },{
    id: 'gwen-mem',
    name: 'Morrigan',
    avatar: 'https://violasys.github.io/assets/images/pfp-gwen-mem.png',
    pronouns: 'She/They',
    roles: ['gatekeeper'],
  }];

  useEffect(() => {
    setMembers(memberFilter.apply(allMembers));
  }, [memberFilter])

  return (
    <BgView style={styles.container}>
      <FilterControls setFilter={setMemberFilter} />
      <MemberList members={members} />
    </BgView>
  );
}

interface MembersFilter {
  apply: (members: SystemMember[]) => SystemMember[],
}

interface FilterControlsProps {
  setFilter: (filter: MembersFilter) => void;
}

const FilterControls = (props: FilterControlsProps): React.ReactElement => {
  const createFilter = (searchText: string): MembersFilter => {
    const apply = (members: SystemMember[]) => members.filter((member: SystemMember) => {
      const fields = [
        member.id,
        member.name,
        member.displayname || '',
        member.description || '',
        member.pronouns || '',
      ];
      (member.roles || []).forEach(role => fields.push(role));
      (member.tags || []).forEach(tag => fields.push(tag));
      return fields.some(f => f.toLocaleLowerCase().indexOf(searchText) >= 0)
    });
    return { apply };
  }

  return <View style={styles.filterView}>
  <TextInput
    style={styles.search}
    placeholder="Search"
    onChangeText={(text) => {
      props.setFilter(createFilter(text.trim().toLocaleLowerCase()));
    }}
    />
    </View>;

}

interface MemberListProps {
  members: SystemMember[];
}

const MemberList = (props: MemberListProps): React.ReactElement => {
  const [pressedMember, setPressedMember] = useState<string>('');
  const orientation = getOrientation();

  const renderItem = ({ item }: { item: SystemMember }) => {
    return <Pressable 
        onPress={() => {}}
        onPressIn={() => setPressedMember(item.id)}
        onPressOut={() => setPressedMember('')}
        style={{ 
          flex: 1,
          opacity: pressedMember === item.id ? 0.6 : 1.0,
        }}>
        <MemberCard member={item} />
      </Pressable>; 
  };

  return <FlatList 
    key={`members-${orientation}`}
    data={props.members}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    numColumns={orientation === 'portrait' ? 1 : 2}
    extraData={[pressedMember]}
  />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 8,
  },
  filterView: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'stretch',
    margin: 8,
  },
  search: {
    flex: 1,
    fontSize: 20,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
