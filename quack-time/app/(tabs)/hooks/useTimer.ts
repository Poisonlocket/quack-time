import { useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { Vibration } from 'react-native';

export function useTimer(currentTimer: 'pomodoro' | 'break', isRunning: boolean, setIsRunning: (b: boolean) => void) {
    const [timeLeft, setTimeLeft] = useState(currentTimer === 'pomodoro' ? 1500 : 300);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
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
        setTimeLeft(currentTimer === 'pomodoro' ? 1500 : 300);
    }, [currentTimer]);

    return { timeLeft, setTimeLeft };
}
