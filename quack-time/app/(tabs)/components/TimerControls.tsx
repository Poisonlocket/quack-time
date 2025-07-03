import { View, Button, StyleSheet } from 'react-native';

type Props = {
    currentTimer: 'pomodoro' | 'break';
    handleClick: (type: 'pomodoro' | 'break') => void;
};

export default function TimerControls({ currentTimer, handleClick }: Props) {
    return (
        <View style={styles.container}>
            {['pomodoro', 'break'].map((type) => (
                <View key={type} style={styles.wrapper}>
                    <Button
                        title={type.charAt(0).toUpperCase() + type.slice(1)}
                        onPress={() => handleClick(type as 'pomodoro' | 'break')}
                        color={currentTimer === type ? '#FFD43B' : '#000'}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    wrapper: {
        borderWidth: 2,
        borderColor: '#FFD43B',
        padding: 5,
        marginHorizontal: 10,
    },
});
