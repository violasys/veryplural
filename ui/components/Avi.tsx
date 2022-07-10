import { Image, StyleSheet, View } from 'react-native';

export default function Avi(props: AviProps) {
    const placeholder = require('../assets/images/avi.png');
    const source = props.uri ? { uri: props.uri } : placeholder;
    const size = interpretSize(props.size);
    return <View style={styles.container}>
        <Image 
            source={source}
            loadingIndicatorSource={placeholder}
            style={{
                width: size,
                height: size,
            }}
        ></Image>
    </View>;
}

export type Size = 'small' | 'medium' | 'large';

export interface AviProps {
    uri?: string;
    size?: Size;
}

const interpretSize = (size: Size | undefined): number => {
    if (typeof size === 'undefined') return interpretSize('medium');
    if (size === 'small') return 24;
    if (size === 'medium') return 64;
    if (size === 'large') return 512;
    throw Error(`Unknown size ${size}`);
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 8,
        margin: 5,
        backgroundColor: '#888888',
    },
});
