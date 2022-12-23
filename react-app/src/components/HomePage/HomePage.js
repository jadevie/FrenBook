import styles from './HomePage.module.css';
import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { LeftPanel } from './LeftPanel/LeftPanel';
import NewFeed from './NewFeed/NewFeed';
import { RightPanel } from './RightPanel/RightPanel';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';


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
