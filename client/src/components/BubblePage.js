import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadColorList } from "../actions/actions";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    props.loadColorList(props.token);
  }, []);

  return (
    <>
      <ColorList />
      <Bubbles />
    </>
  );
};

const mapStateToProps = (state) => {
  return { colorList: state.colorList, token: state.token };
};

export default connect(mapStateToProps, { loadColorList })(BubblePage);
