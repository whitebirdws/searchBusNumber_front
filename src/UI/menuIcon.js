import { MdHome, MdSearch, MdArticle } from "react-icons/md";
import styles from "./menuIcon.module.css";
import { BusNumberProvider } from "../store/BusNumberArrContext";
export const HomeIcon = (
  <MdHome className={styles.busStationMenu_menuLayout_icon} />
);
export const SearchIcon = (
  <MdSearch className={styles.busStationMenu_menuLayout_icon} />
);
export const ArticleIcon = (
  <MdArticle className={styles.busStationMenu_menuLayout_icon} />
);

export const SearchBusNumberIcon = <BusNumberProvider></BusNumberProvider>;
