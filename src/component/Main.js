import React, { useEffect, useRef, useState, useMemo } from "react";

import styles from "./Menu.module.css";
import { HomeIcon } from "../UI/menuIcon";
import BusStationSearch from "./BusStationSearch";
import BusNumberArrContext from "../store/BusNumberArrContext";

const Main = () => {
  const timer = new Date();
  const [currentHour, setCurrentHour] = useState(timer.getHours());
  const [currentMinutes, setCurrentMinutes] = useState(timer.getMinutes());
  const [currentSeconds, setCurrentSeconds] = useState(timer.getSeconds());

  useEffect(() => {
    let res = setInterval(() => {
      const time = new Date();
      setCurrentHour(time.getHours());
      setCurrentMinutes(time.getMinutes());
      setCurrentSeconds(time.getSeconds());
    }, 1000);
    return () => {
      clearInterval(res);
    };
  }, []);
  return (
    <BusNumberArrContext.Consumer>
      {({ state }) => {
        return (
          <>
            <div className={styles.busStation_container}>
              <div className={styles.busStationMenu}>
                <ul className={styles.busStationMenu_menuLayout}>
                  <li onClick={() => window.location.reload()}>{HomeIcon}</li>
                </ul>
              </div>

              <div className={styles.busStationMenu_notice}>
                <h2>경기도 버스 노선 조회 서비스</h2>
                <ul className={styles.busStationMenu_timeLayout}>
                  <li>{currentHour < 10 ? "0" + currentHour : currentHour}</li>
                  <li>:</li>
                  <li>{currentMinutes}</li>
                  <li>:</li>
                  <li>
                    {currentSeconds < 10
                      ? "0" + currentSeconds
                      : currentSeconds}
                  </li>
                </ul>
              </div>
              <BusStationSearch />
            </div>
          </>
        );
      }}
    </BusNumberArrContext.Consumer>
  );
};
export default Main;
