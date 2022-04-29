import styles from "./BusNumberButton.module.css";
import BusNumberArrContext from "../store/BusNumberArrContext";
const BusNumberButton = () => {
  return (
    <BusNumberArrContext.Consumer>
      {({ state, actions }) => {
        return (
          <div>
            {state.busNumberInfo.map((value) => {
              return (
                <div className={styles.busStationSearch_view_section}>
                  <div
                    className={styles.busStationSearch_view_section_subLayout}
                  >
                    <div
                      className={styles.busNumberButton}
                      onClick={() => {
                        actions.setFilterNum(value.busNum);
                        actions.setFilterRegion(value.region);
                      }}
                    >
                      {value.busNum}
                    </div>
                    <div
                      className={
                        styles.busStationSearch_view_section_subLayout_title
                      }
                    >
                      {value.routeId}
                    </div>
                  </div>
                  <div className={styles.busStationSearch_line}></div>
                </div>
              );
            })}
          </div>
        );
      }}
    </BusNumberArrContext.Consumer>
  );
};

export default BusNumberButton;
