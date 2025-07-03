import { Platform, ProgressBarAndroid, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default function ProgressIndicator({ progress }: { progress: number }) {
    return Platform.OS === 'android' ? (
        <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress} style={styles.bar} color="#FFD43B" />
    ) : (
        <Progress.Bar progress={progress} width={200} color="#FFD43B" />
    );
}

const styles = StyleSheet.create({
    bar: {
        width: '80%',
        height: 10,
        marginBottom: 20,
    },
});
