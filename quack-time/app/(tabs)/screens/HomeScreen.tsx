import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TimerControls from '../components/TimerControls';
import TimerDisplay from '../components/TimerDisplay';
import ProgressIndicator from '../components/ProgressIndicator';
import AppLogo from '../components/AppLogo';
import { useTimer } from '../hooks/useTimer';
import { useMovementReset } from '../hooks/useMovementReset';

export default function HomeScreen() {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTimer, setCurrentTimer] = useState<'pomodoro' | 'break'>('pomodoro');
    const [lastPress, setLastPress] = useState<number | null>(null);
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    const { timeLeft, setTimeLeft } = useTimer(currentTimer, isRunning, setIsRunning);
    useMovementReset(setTimeLeft, setIsRunning, currentTimer);

    const totalTime = currentTimer === 'pomodoro' ? 1500 : 300;
    const progress = 1 - timeLeft / totalTime;

    const handleSingleClick = (type: 'pomodoro' | 'break') => {
        if (currentTimer === type) {
            setIsRunning((prev) => !prev);
        } else {
            setCurrentTimer(type);
            setIsRunning(true);
        }
    };

    const handleDoubleClick = (type: 'pomodoro' | 'break') => {
        if (currentTimer === type) {
            setIsRunning(false);
            setTimeLeft(type === 'pomodoro' ? 1500 : 300);
        }
    };

    const handleClick = (type: 'pomodoro' | 'break') => {
        const now = Date.now();

        if (lastPress && now - lastPress < 300) {
            if (clickTimeout) clearTimeout(clickTimeout);
            handleDoubleClick(type);
        } else {
            const timeout = setTimeout(() => handleSingleClick(type), 300);
            setClickTimeout(timeout);
        }

        setLastPress(now);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>QuackTime</Text>
            <TimerDisplay timeLeft={timeLeft} />
            <ProgressIndicator progress={progress} />
            <TimerControls currentTimer={currentTimer} handleClick={handleClick} />
            <AppLogo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDE8D0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#000',
    },
});
