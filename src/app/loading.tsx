import React from "react";
import styles from "@/components/Loader/loader.module.css";
const loading = () => {
  return (
    <div className={styles.loader}>
      <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
      </svg>
    </div>
  );
};

export default loading;
