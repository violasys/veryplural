import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet } from 'react-native';
import MemberCard from '../components/MemberCard';

import { View, TextInput } from '../components/Themed';
import { RootTabScreenProps, SystemMember } from '../types';
import { getOrientation } from '../util/orientation';

export default function MembersScreen({ navigation }: RootTabScreenProps<'Members'>) {
  const [searchText, setSearchText] = useState<string>('');
  const [pressedMember, setPressedMember] = useState<string>('');
  const [members, setMembers] = useState<SystemMember[]>([]);
  const orientation = getOrientation();
  
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
    const filtered = allMembers.filter((member: SystemMember) => {
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
    setMembers(filtered);
  }, [searchText]);

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={(text) => {
          setSearchText(text.trim().toLocaleLowerCase());
        }}
      />
      <FlatList 
        key={`members-${orientation}`}
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={orientation === 'portrait' ? 1 : 2}
        extraData={[pressedMember, searchText]}
       />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 8,
  },
  search: {
    marginLeft: 8,
    marginRight: 8,
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
