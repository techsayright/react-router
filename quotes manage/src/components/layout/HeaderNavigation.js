import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/Header.module.scss";

export default function HeaderNavigation() {
  return (
    <header className={styles.header}>
      <div>
        <strong>Me Shayar Hoon!</strong>
      </div>
      <div className={styles.flex}>
        <div>
          <NavLink activeClassName={styles.active} to="/quotes" exact>
            All Quotes
          </NavLink>
        </div>
        <div>
          <NavLink activeClassName={styles.active} to="/new-quotes" exact>
            Add Quotes
          </NavLink>
        </div>
      </div>
    </header>
  );
}
