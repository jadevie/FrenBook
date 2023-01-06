import styles from './RightPanel.module.css';
import React from 'react';
import aa from '../../aa.png';
import motivation from '../../motivation.png';

export const RightPanel = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sponsorWrapper}>
                <h4>Sponsored</h4>
                <button>
                    <span>
                        <a href='https://www.appacademy.io/' target='#' className={styles.link}>
                            <img src={aa} alt='sponsored' className={styles.img} />
                            <div className={styles.infoWrapper}>
                                <div>Software Engineering Courses</div>
                                <div>appacademy.io</div>
                            </div>
                        </a>
                    </span>
                </button>

                <button>
                    <span>
                        <a href='https://www.careerexperts.co.uk/career-progression/motivational-quotes-for-work' target='#' className={styles.link}>
                            <img src={motivation} alt='sponsored' className={styles.img} />
                            <div className={styles.infoWrapper}>
                                <div>Motivational quotes for work</div>
                                <div>careerexperts.co.uk</div>
                            </div>
                        </a>
                    </span>
                </button>
            </div>

        </div>
    );
};
