import React, { useState, useRef, useEffect } from "react";
import Header from "../header";
import StickyCursor from "../stickyCursor/";
import styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXing } from "@fortawesome/free-brands-svg-icons"; // Example icon
import Link from "next/link";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const stickyElement = useRef(null);

  function handleHeaderClick() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  // Use useEffect to trigger pulse effect after ::before effect
  useEffect(() => {
    if (isSidebarOpen) {
      // Add pulse effect after 0.4s, the duration of ::before transition
      const timer = setTimeout(() => {
        setIsPulseActive(true);
      }, 400); // Match this with the transition duration of ::before effect

      return () => clearTimeout(timer);
    } else {
      // Reset pulse effect when sidebar closes
      setIsPulseActive(false);
    }
  }, [isSidebarOpen]);

  return (
    <div>
      <div className={`${styles.nav} ${isSidebarOpen ? styles.hidden : ""}`}>
        <Header ref={stickyElement} onClick={handleHeaderClick} />
        <StickyCursor stickyElement={stickyElement} />
        <div className={styles.Options}>
          <li className={styles.contentitem}>
            <Link href="/" className={styles.linklinkhelike}>
              <span>HOME</span>
            </Link>
          </li>
          <li className={styles.contentitem}>
            <Link href="#" className={styles.linklinkhelike}>
              <span>RULES</span>
            </Link>
          </li>
          <li className={styles.contentitem}>
            <Link href="/leaderboard" className={styles.linklinkhelike}>
              <span>LEADERBOARD</span>
            </Link>
          </li>
          <li className={styles.contentitem}>
            <Link href="/quiz" className={styles.linklinkhelike}>
              <span>QUIZ</span>
            </Link>
          </li>
        </div>
      </div>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <FontAwesomeIcon
            className={styles.close}
            icon={faXing}
            style={{ cursor: "pointer" }}
            onClick={handleHeaderClick}
          />
          <div className={styles.navOptions}>
            <h1
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              HOME
            </h1>
            <h1
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              RULES
            </h1>
            <h1
              className={`${styles.btn5} ${
                isPulseActive ? styles.pulseActive : ""
              }`}
            >
              LEADERBOARD
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
