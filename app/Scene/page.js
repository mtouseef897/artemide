import React from "react";
import FrameComponent3 from "../../components/ArtemideTemple";
import GroupComponent from "../../components/Footer"; // Use PascalCase for the component name
import '../global.css';
import styles from '../index.module.css';  // Import styles here
import Header from "../../components/header"

function App() {
  return (
    <div className={styles.climatic}> 
    <Header/>
      <FrameComponent3 />
      <GroupComponent /> 
    </div>
  );
}

export default App;
