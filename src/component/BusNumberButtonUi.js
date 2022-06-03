import React from "react";
import styles from "./BusSchedule.module.css";
import BusNumberArrContext from "../store/BusNumberArrContext";

const BusNumberButtonUi = () => {
  return (
    <BusNumberArrContext.Consumer>
      {({ state }) => {
        return (
          <div className={styles.busSchedule_view_section}>
            <div className={styles.busSchedule_view_section_subLayout}>
              <table>
                <thead>
                  <tr>
                    <td className={styles.busSchedule_thead}>노선번호</td>
                    <td className={styles.busSchedule_thead}>운행 지역</td>
                    <td className={styles.busSchedule_thead}>기점</td>
                    <td className={styles.busSchedule_thead}>기점 첫차시간</td>
                    <td className={styles.busSchedule_thead}>기점 막차시간</td>
                    <td className={styles.busSchedule_thead}>종점</td>
                    <td className={styles.busSchedule_thead}>종점 첫차시간</td>
                    <td className={styles.busSchedule_thead}>종점 막차시간</td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.routeName}
                      </td>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.regionName}
                      </td>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.startStationName}
                      </td>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.upFirstTime}
                      </td>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.upLastTime}
                      </td>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.endStationName}
                      </td>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.downFirstTime}
                      </td>
                      <td className={styles.busSchedule_tbody}>
                        {state.compresiveInfo.downLastTime}
                      </td>
                    </>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }}
    </BusNumberArrContext.Consumer>
  );
};

export default BusNumberButtonUi;
