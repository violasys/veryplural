import { Appearance, StyleSheet, View } from 'react-native';

import { Text } from './Themed';
import { SystemMember } from '../types';
import Avi from './Avi';
import Card from './Card';


export default function MemberCard(props: MemberCardProps) {
    return <Card style={styles.card}>
        <Avi uri={props.member.avatar} />
        <View style={[styles.namebox]}>
            <Text style={styles.name}>{props.member.displayname || props.member.name}</Text>
            {props.member.pronouns && <Text style={styles.pronouns}>{props.member.pronouns}</Text>}
        </View>
    </Card>;
}

export interface MemberCardProps {
    member: SystemMember,
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    namebox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      marginLeft: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pronouns: {
        fontSize: 16,
    }
});
