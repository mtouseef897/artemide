import React, { useState } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../anim';
import Link from 'next/link'; // Next.js Link component
import Curve from './Curve';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Un'altra esperienza",
    href: "/Scene",
  },

];

export default function Index() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={styles.menu}>
      <div className={styles.body}>
        <div onMouseLeave={() => setSelectedIndicator(pathname)} className={styles.nav}>
          <div className={styles.header}>
            <p>Navigazione</p>
          </div>
          {navItems.map((data, index) => (
            <Link href={data.href} key={index} passHref legacyBehavior>
              <a
                onClick={() => setSelectedIndicator(data.href)}
                className={selectedIndicator === data.href ? styles.activeLink : ''}
              >
                {data.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}
