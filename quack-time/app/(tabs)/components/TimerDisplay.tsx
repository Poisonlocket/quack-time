import { Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/formatTime';

export default function TimerDisplay({ timeLeft }: { timeLeft: number }) {
    return <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>;
}

const styles = StyleSheet.create({
    timerText: {
        fontSize: 48,
        marginBottom: 20,
    },
});
