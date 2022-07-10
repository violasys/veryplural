import { Dimensions } from "react-native";

export type Orientation = 'portrait' | 'landscape';

export const getOrientation = (): Orientation => {
    const dwin = Dimensions.get('window');
    const dscr = Dimensions.get('screen');

    if (dscr.height >= dscr.width) {
        return 'portrait';
    }
    if (dwin.height >= dwin.width * 16. / 12) {
        return 'portrait';
    }
    return 'landscape';
};
