// app/page.js
import Layout from './layout'; 
import Artemide from '../components/Artemide'; 
import styles from './index.module.css'; 
import Footer from "../components/Footer"
import Header from "../components/header"
import "./global.css"

const Home = () => {
  return (
    <Layout>
      <div className={styles.climatic}> 
        <Header/>
        <Artemide /> 
        <Footer/>
      </div>
    </Layout>
  );
};

export default Home; 
