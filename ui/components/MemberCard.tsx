import { Appearance, StyleSheet, View } from 'react-native';

import { Text } from './Themed';
import { SystemMember } from '../types';
import Avi from './Avi';


export default function MemberCard(props: MemberCardProps) {
    const theme = Appearance.getColorScheme();
    const lightness = styles[theme as ('light' | 'dark')];
    return <View style={[styles.card, lightness]}>
        <Avi uri={props.member.avatar} />
        <View style={[styles.namebox]}>
            <Text style={styles.name}>{props.member.displayname || props.member.name}</Text>
            {props.member.pronouns && <Text style={styles.pronouns}>{props.member.pronouns}</Text>}
        </View>
    </View>;
}

export interface MemberCardProps {
    member: SystemMember,
}

const styles = StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 20,
      borderRadius: 8,
      margin: 8,
      flex: 1,
      overflow: 'hidden',
    },
    light: {
        borderColor: '#c6c6c6',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
    },
    dark: {
        backgroundColor: '#1e1e1e',
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
