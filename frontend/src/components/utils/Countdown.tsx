import React, { useEffect, useState } from "react";

interface CountdownProps {
    initialSeconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [seconds]);

    return <>{seconds}</>;
};

export default Countdown;
