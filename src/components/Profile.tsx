import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level} = useContext(ChallengesContext);

    return(
        <div className={styles.profileContainer}>
            <img src="nos2.jpeg" alt="Fernando Santos"/>
            <div>
                <strong>Fernando Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                   {level}
                </p>
            </div>
        </div>
    );
}