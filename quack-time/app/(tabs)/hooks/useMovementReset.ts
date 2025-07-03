import { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export function useMovementReset(setTimeLeft: (v: number) => void, setIsRunning: (v: boolean) => void, currentTimer: 'pomodoro' | 'break') {
    useEffect(() => {
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

            if (totalAcceleration > 1.5) {
                setIsRunning(false);
                setTimeLeft(currentTimer === 'pomodoro' ? 1500 : 300);
                console.log('Movement detected! Timer reset.');
            }
        });

        Accelerometer.setUpdateInterval(100);
        return () => subscription.remove();
    }, [currentTimer]);
}
