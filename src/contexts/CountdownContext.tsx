import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { ChallengesContext } from './ChallengeContext';



interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)
//tipagem global
let countdownTimeOut: NodeJS.Timeout;

export function CountdownProvider ({children}: CountdownProviderProps) {
    const { startNewChallenge} = useContext(ChallengesContext);

    //25 minutos em segundos
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    //arredondando pra baixo
    const minutes = Math.floor(time / 60);
    //resto da divisão
    const seconds = time % 60;

    function startCountDown() {
        setIsActive(true);
    }

    function resetCountDown() {
        clearTimeout(countdownTimeOut);
        setIsActive(false);
        setHasFinished(false);
        setTime(25 * 60);
        
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountdownContext.Provider>
    )
} 