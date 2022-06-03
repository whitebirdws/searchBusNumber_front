import { createContext, useRef, useState } from "react";

const BusNumberArrContext = createContext({
  state: { isLoggedIn: false, busNumber: 20, region: "경기도" },
  actions: {
    setIsLoggedIn: () => {},
    setBusNumber: () => {},
    setRegion: () => {},
  },
});

export const BusNumberProvider = ({ children }) => {
  const [busNumberInfo, setBusNumberInfo] = useState([]);

  const [searchBusNumber, setSearchBusNumber] = useState(null);

  const [filterRouteId, setFilterRouteId] = useState(null);

  const [compresiveInfo, setCompresiveInfo] = useState([]);

  const [busStationList, setBusStationList] = useState([]);

  const [filterStationInfo, setFilterStationInfo] = useState([
    {
      routeId: "sampleId",
      stationId: "sample",
      stationName: "sample",
      staOrder: 0,
      plateNo1: 0,
      plateNo2: 0,
      predictTime1: 0,
      predictTime2: 0,
      locationNo1: 0,
      locationNo2: 0,
    },
  ]);

  const [filterStationName, setFilterStationName] = useState({});

  const busStaionListRef = useRef(null);

  const value = {
    ref: {
      busStaionListRef,
    },
    state: {
      busNumberInfo,

      busStationList,

      filterRouteId,

      searchBusNumber,

      compresiveInfo,

      filterStationInfo,
      filterStationName,
    },

    actions: {
      setBusNumberInfo,

      setBusStationList,

      setSearchBusNumber,

      setFilterRouteId,

      setCompresiveInfo,

      setFilterStationInfo,

      setFilterStationName,
    },
  };

  return (
    <BusNumberArrContext.Provider value={value}>
      {children}
    </BusNumberArrContext.Provider>
  );
};

export default BusNumberArrContext;
