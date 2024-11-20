import React from "react";
import styles from "./preloader.module.css";

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img className={styles.logo} src="/logo.png" alt="Logo" /> {/* Add your logo here */}
            <div className={styles.loader}>
            caricamento
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
            </div>
        </div>
    );
};

export default Preloader;
