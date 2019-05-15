import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Qiwei Yang</h1>
          <p>Penultimate year computer science student from UNSW Sydney</p>
          <p>Looking for a software developer internship/part-time job</p>
          <p>My email: <a href = "mailto: yangqiwei97@gmail.com">yangqiwei97@gmail.com</a></p>
        </div>
      </div>
    );
  }
}
