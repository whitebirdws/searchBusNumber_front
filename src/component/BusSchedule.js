import React, { useEffect, useState } from "react";
import styles from "./BusSchedule.module.css";
import BusNumberArrContext from "../store/BusNumberArrContext";
import BusNumberButtonUi from "./BusNumberButtonUi";
import axios from "axios";
const BusSchedule = (props) => {
  const fixBusArrival_infromation_list = (
    stationId,
    routeId,
    stationSeq,
    state,
    actions
  ) => {
    const result = axios({
      method: "post",
      url: "/busarrivalservice",
      data: {
        stationId: stationId,
        routeId: routeId,
        stationOrder: stationSeq,
      },
    }).then((res) => {
      let data = res.data.response.msgBody;
      data === undefined
        ? actions.setFilterStationInfo({
            routeId: "도착정보없음",
            stationId: "도착정보없음",
            stationName: "도착정보없음",
            staOrder: "도착정보없음",
            plateNo1: "도착정보없음",
            plateNo2: "도착정보없음",
            predictTime1me1: "도착정보없음",
            predictTime2me2: "도착정보없음",
            locationNo1: 0,
            locationNo2: 0,
          })
        : actions.setFilterStationInfo({
            routeId: data.busArrivalItem.routeId._text,
            stationId: data.busArrivalItem.stationId._text,
            stationName: state.filterStationName.stationName,
            staOrder: data.busArrivalItem.staOrder._text,
            plateNo1: data.busArrivalItem.plateNo1._text,
            plateNo2: data.busArrivalItem.plateNo2._text,
            predictTime1: data.busArrivalItem.predictTime1._text,
            predictTime2: data.busArrivalItem.predictTime2._text,
            locationNo1: data.busArrivalItem.locationNo1._text,
            locationNo2: data.busArrivalItem.locationNo2._text,
          });
    });
    return result;
  };
  return (
    <BusNumberArrContext.Consumer>
      {({ state, func, actions }) => {
        return (
          <div className={styles.busSchedule}>
            <div className={styles.busSchedule_container}>
              <div className={styles.busSchedule_title_section}>
                <h3 className={styles.busSchedule_title}>
                  버스 노선 상세 정보
                </h3>
                <div className={styles.busSchedule_line}></div>
                <BusNumberButtonUi />

                <div className={styles.busSchedule_manageSection}>
                  <div
                    className={
                      styles.busSchedule_manageSection_predict_Infromation
                    }
                  >
                    <div className={styles.noticeInformationLayout}>
                      <ul>
                        <li>정거장</li>
                      </ul>
                      <ul>
                        <li>
                          {state.filterStationInfo.stationName === undefined
                            ? "도착정보 없음"
                            : state.filterStationInfo.stationName}
                        </li>
                      </ul>
                    </div>
                    <div className={styles.arriveInformationList}>
                      <ul>
                        <li>첫번째 도착예정 버스</li>
                        <li>도착 예정시간</li>
                        <li>현재 위치</li>
                      </ul>
                      <ul>
                        <li>
                          {state.filterStationInfo.plateNo1 === undefined
                            ? "도착정보 없음"
                            : state.filterStationInfo.plateNo1}
                        </li>
                        <li>
                          {state.filterStationInfo.predictTime1 === undefined
                            ? "도착정보 없음"
                            : state.filterStationInfo.predictTime1 +
                              "분 후 도착"}
                        </li>
                        <li>
                          {state.filterStationInfo.locationNo1 === undefined
                            ? "도착정보 없음"
                            : state.filterStationInfo.locationNo1 +
                              "번째 전 정류소"}
                        </li>
                      </ul>
                    </div>
                    <div className={styles.secondArriveInformationList}>
                      <ul>
                        <li>두번째 도착예정 버스</li>
                        <li>도착예정시간</li>
                        <li>현재 위치</li>
                      </ul>
                      <ul>
                        <li>
                          {state.filterStationInfo.plateNo2 === undefined
                            ? "도착정보 없음"
                            : state.filterStationInfo.plateNo2}
                        </li>
                        <li>
                          {state.filterStationInfo.predictTime2 === undefined
                            ? "도착정보 없음"
                            : state.filterStationInfo.predictTime2 +
                              "분 후 도착"}
                        </li>
                        <li>
                          {state.filterStationInfo.locationNo2 === undefined
                            ? "도착정보 없음"
                            : state.filterStationInfo.locationNo2 +
                              "번째 전 정류소"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className={styles.busSchedule_manageSection_staionNameList}
                  >
                    <h2> 버스 정거장 목록</h2>
                    <h3> 버스정거장 이름을 선택하세요</h3>
                    {state.busStationList.map((value, idx) => (
                      <React.Fragment key={idx}>
                        <div>
                          <p
                            className={styles.staionNameList_stationName}
                            onClick={() => {
                              actions.setFilterStationName({
                                stationName: value.stationName,
                              });
                              fixBusArrival_infromation_list(
                                value.stationId,
                                state.filterRouteId,
                                value.stationSeq,
                                state,
                                actions
                              );
                            }}
                          >
                            {value.stationName}
                          </p>

                          <p>{value.stationSeq}</p>

                          {value.stationId ===
                          state.filterStationInfo.stationId ? (
                            <p className={styles.plateNo1}>
                              {state.filterStationInfo.plateNo1}
                            </p>
                          ) : (
                            ""
                          )}

                          <p className={styles.busSchedule_bar}></p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </BusNumberArrContext.Consumer>
  );
};

export default React.memo(BusSchedule);
