import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./Menu.module.css";
import { HomeIcon, SearchIcon, ArticleIcon } from "../UI/menuIcon";
import BusStationSearch from "./BusStationSearch";

import BusNumberArrContext from "../store/BusNumberArrContext";

const Main = () => {
  return (
    <BusNumberArrContext.Consumer>
      {({ state }) => {
        return (
          <div className={styles.busStation_container}>
            <div className={styles.busStationMenu}>
              <ul className={styles.busStationMenu_menuLayout}>
                <li> {HomeIcon}</li>
              </ul>
            </div>

            <h2>경기도 버스 노선 조회</h2>

            <BusStationSearch />
          </div>
        );
      }}
    </BusNumberArrContext.Consumer>
  );
};
export default Main;
