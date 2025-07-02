import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Platform, ProgressBarAndroid, Vibration } from 'react-native'; // Vibration importiert
import * as Haptics from 'expo-haptics';
import { ProgressView } from '@react-native-community/progress-view';

export default function HomeScreen() {
    const [timeLeft, setTimeLeft] = useState(90); // Default to Pomodoro timer
    const [isRunning, setIsRunning] = useState(false);
    const [currentTimer, setCurrentTimer] = useState<'pomodoro' | 'break'>('pomodoro'); // Active timer
    const [lastPress, setLastPress] = useState<number | null>(null);
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    const totalTime = currentTimer === 'pomodoro' ? 10 : 300; // Total time for the current session
    const progress = 1 - timeLeft / totalTime; // Calculate progress as a fraction

    const handleSingleClick = (type: 'pomodoro' | 'break') => {
        if (currentTimer === type) {
            // Toggle pause/resume if the same timer is active
            setIsRunning((prev) => !prev);
        } else {
            // Switch to the selected timer and reset it
            setCurrentTimer(type);
            setTimeLeft(type === 'pomodoro' ? 90 : 300);
            setIsRunning(true);
        }
    };

    const handleDoubleClick = (type: 'pomodoro' | 'break') => {
        if (currentTimer === type) {
            // Reset the current timer
            setTimeLeft(type === 'pomodoro' ? 10 : 300);
            setIsRunning(false);
        }
    };

    const handleClick = (type: 'pomodoro' | 'break') => {
        const now = Date.now();

        if (lastPress && now - lastPress < 300) {
            if (clickTimeout) clearTimeout(clickTimeout);
            handleDoubleClick(type);
        } else {
            const timeout = setTimeout(() => {
                handleSingleClick(type);
            }, 300);
            setClickTimeout(timeout);
        }

        setLastPress(now);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            // Vibrieren nur, wenn Pomodoro fertig ist
            if (currentTimer === 'pomodoro') {
                Vibration.vibrate(1000); // 1 Sekunde lang vibrieren
            }
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, timeLeft, currentTimer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={progress}
                    style={styles.progressBar}
                    color="#FFD43B"
                />
            ) : (
                <ProgressView progress={progress} style={styles.progressBar} />
            )}
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Pomodoro"
                        onPress={() => handleClick('pomodoro')}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Break"
                        onPress={() => handleClick('break')}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 48,
        marginBottom: 20,
    },
    progressBar: {
        width: '80%',
        height: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    buttonWrapper: {
        borderWidth: 2,
        borderColor: '#FFD43B',
        borderRadius: 25,
        padding: 5,
        marginHorizontal: 10,
    },
});
