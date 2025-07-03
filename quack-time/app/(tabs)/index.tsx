import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Platform, ProgressBarAndroid, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Accelerometer } from 'expo-sensors';
import * as Progress from 'react-native-progress';

export default function HomeScreen() {
    const [timeLeft, setTimeLeft] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTimer, setCurrentTimer] = useState<'pomodoro' | 'break'>('pomodoro');
    const [lastPress, setLastPress] = useState<number | null>(null);
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    const totalTime = currentTimer === 'pomodoro' ? 10 : 300;
    const progress = 1 - timeLeft / totalTime;

    const movementThreshold = 1.5; // Adjust this value as needed

    const handleSingleClick = (type: 'pomodoro' | 'break') => {
        if (currentTimer === type) {
            setIsRunning((prev) => !prev);
        } else {
            setCurrentTimer(type);
            setTimeLeft(type === 'pomodoro' ? 10 : 300);
            setIsRunning(true);
        }
    };

    const handleDoubleClick = (type: 'pomodoro' | 'break') => {
        if (currentTimer === type) {
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

            if (currentTimer === 'pomodoro') {
                Vibration.vibrate(1000);
            }
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning, timeLeft, currentTimer]);

    useEffect(() => {
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

            if (totalAcceleration > movementThreshold) {
                setIsRunning(false);
                setTimeLeft(currentTimer === 'pomodoro' ? 10 : 300);
                console.log('Movement detected! Timer reset.');
            }
        });

        Accelerometer.setUpdateInterval(100); // Update every 100ms

        return () => {
            subscription.remove();
        };
    }, [currentTimer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.appTitle}>QuackTime</Text>
            </View>
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
                <Progress.Bar progress={progress} width={200} />
            )}
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Pomodoro"
                        onPress={() => handleClick('pomodoro')}
                        color={currentTimer === 'pomodoro' ? '#FFD43B' : '#000'}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Break"
                        onPress={() => handleClick('break')}
                        color={currentTimer === 'break' ? '#FFD43B' : '#000'}
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
        padding: 5,
        marginHorizontal: 10,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#000',
    },
});