import React from "react";
import styled from "./Spinner.module.css";
const Spinner = () => {
  return (
    <React.Fragment>
      <div className={styled.spin}></div>
      <div className={styled.text}>페이지를 불러오는 중입니다.</div>
    </React.Fragment>
  );
};

export default Spinner;
