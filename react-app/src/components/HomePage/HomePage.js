import styles from './HomePage.module.css';
import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { LeftPanel } from './LeftPanel/LeftPanel';
import NewFeed from './NewFeed/NewFeed';
import { RightPanel } from './RightPanel/RightPanel';


const HomePage = () => {
    return (
        <>
            <div>
                <div className={styles.Navbar}>
                    <Navbar />
                </div>
                <div className={styles.HomePage}>
                    <LeftPanel />
                    <NewFeed />
                    <RightPanel />
                </div>

            </div>

        </>
    );
};

export default HomePage;
