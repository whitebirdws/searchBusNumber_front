import React, { useRef, useState } from "react";
import styles from "./BusStationSearch.module.css";
import styled from "../UI/BusNumberButton.module.css";
import { MdSearch } from "react-icons/md";
import BusNumberArrContext from "../store/BusNumberArrContext";
import BusSchedule from "./BusSchedule";
import axios from "axios";

const BusStationSearch = (props) => {
  const numberRef = useRef(null);
  const searchResultRef = useRef(null);

  const [viewer, setViewer] = useState(false);

  const searchNum = (actions) => {
    const result = axios("/busNumberInfo", {
      method: "post",
      data: {
        title: numberRef.current.value,
      },
    })
      .then((res) => {
        res.data.response.msgBody.busRouteList.map((v) =>
          actions.setBusNumberInfo((prev) => [
            ...prev,
            {
              routeId: v.routeId._text,
              busNum: v.routeName._text,
              region: v.regionName._text,
            },
          ])
        );
      })
      .catch((error) => {
        console.log(error);
        searchResultRef.current.textContent = "찾으시는 번호가 없습니다.";
        let res = setInterval(() => {
          searchResultRef.current.textContent = "";
          window.location.reload();
        }, 2000);
      });

    numberRef.current.value = "";
    actions.setBusNumberInfo([]); //초기화를 위해
    return result;
  };

  const comprehensiveOfInfo = (routeId, actions) => {
    const result = axios({
      method: "post",
      url: "/comprehensiveInfo",
      data: {
        title: routeId,
      },
    }).then((res) => {
      let tempData = res.data.response.msgBody.busRouteInfoItem;
      actions.setCompresiveInfo({
        routeId: tempData.routeId._text,
        regionName: tempData.regionName._text,
        routeName: tempData.routeName._text,
        startStationName: tempData.startStationName._text,
        upFirstTime: tempData.upFirstTime._text,
        upLastTime: tempData.upLastTime._text,
        endStationName: tempData.endStationName._text,
        downFirstTime: tempData.downFirstTime._text,
        downLastTime: tempData.downLastTime._text,
      });
    });
    return result;
  };

  const fixBusStationList = (routeId, actions) => {
    const result = axios({
      method: "post",
      url: "/busStationList",
      data: {
        title: routeId,
      },
    }).then((res) => {
      const tempData = res.data.response.msgBody.busRouteStationList;
      tempData.map((v) => {
        actions.setBusStationList((prev) => [
          ...prev,
          {
            stationName: v.stationName._text,
            stationId: v.stationId._text,
            stationSeq: v.stationSeq._text,
          },
        ]);
      });
    });
    return result;
  };

  return (
    <>
      <BusNumberArrContext.Consumer>
        {({ state, actions }) => {
          return (
            <>
              <div className={styles.busStationSearch}>
                <div className={styles.busStationSearch_viewContainer}>
                  <h3 className={styles.busStationSearch_title}>
                    버스 노선 조회
                  </h3>
                  <div className={styles.busStationSearch_line}></div>
                  <div className={styles.busStationSearch_titleSection}>
                    <div className={styles.busStationSearch_inputSection}>
                      <input
                        className={styles.busStationSearch_input}
                        type="text"
                        maxLength={4}
                        ref={numberRef}
                      />
                      <div className={styles.busStationSearch_desc}>
                        번 버스를 찾아주세요
                      </div>
                      <MdSearch
                        className={styles.SearchBusNumberIcon}
                        onClick={() => {
                          actions.setBusStationList([{ stationName: "" }]);
                          numberRef.current.value !== ""
                            ? searchNum(actions)
                            : alert("버스번호를 입력해주세요");
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.busStationSearch_container}>
                    <div ref={searchResultRef} className={styles.searchResult}>
                      {state.busNumberInfo.map((value, idx) => {
                        return (
                          value.busNum && (
                            <React.Fragment key={idx}>
                              <div
                                className={styled.busStationSearch_view_section}
                              >
                                <div
                                  className={
                                    styled.busStationSearch_view_section_subLayout
                                  }
                                >
                                  <div
                                    className={styled.busNumberButton}
                                    onClick={() => {
                                      actions.setFilterNum(value.busNum);
                                      actions.setFilterRegion(value.region);
                                    }}
                                  >
                                    {value.busNum}
                                  </div>

                                  <div
                                    className={
                                      styled.busStationSearch_view_section_subLayout_title
                                    }
                                  >
                                    {value.region}
                                    {value.routeId}
                                  </div>
                                </div>
                                <div
                                  className={styled.busStationSearch_line}
                                ></div>
                                <span
                                  onClick={() => {
                                    setViewer(true);
                                    actions.setBusStationList([
                                      { stationName: null },
                                    ]);
                                    actions.setFilterRouteId(value.routeId);
                                    comprehensiveOfInfo(value.routeId, actions);
                                    fixBusStationList(value.routeId, actions);
                                  }}
                                >
                                  자세히 보기
                                </span>
                              </div>
                            </React.Fragment>
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {viewer === true ? <BusSchedule /> : ""}
            </>
          );
        }}
      </BusNumberArrContext.Consumer>
    </>
  );
};

export default React.memo(BusStationSearch);
