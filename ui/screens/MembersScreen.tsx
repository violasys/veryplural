import { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet } from 'react-native';

import { View, TextInput } from '../components/Themed';
import { RootTabScreenProps, SystemMember } from '../types';
import MemberCard from './MemberCard';

export default function MembersScreen({ navigation }: RootTabScreenProps<'Members'>) {
  const [searchText, setSearchText] = useState<string>('');
  
  const members: SystemMember[] = [{
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
  },{
    id: 'gwen-mem',
    name: 'Morrigan',
    avatar: 'https://violasys.github.io/assets/images/pfp-gwen-mem.png',
    pronouns: 'She/They',
    roles: ['gatekeeper'],
  }].filter((member: SystemMember) => {
    const fields = [
      member.id,
      member.name,
      member.displayname || '',
      member.description || '',
      member.pronouns || '',
    ];
    (member.roles || []).forEach(role => fields.push(role));
    return fields.some(f => f.toLocaleLowerCase().indexOf(searchText) >= 0);
  });

  const dimensions = Dimensions.get('window');
  const isPortrait = dimensions.height >= dimensions.width * 16. / 12.;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={(text) => setSearchText(text.trim().toLocaleLowerCase())}
      />
      <FlatList 
        data={members}
        renderItem={({ item }) => (<MemberCard member={item} />)}
        keyExtractor={(item) => item.id}
        numColumns={isPortrait ? 1 : 2}
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
