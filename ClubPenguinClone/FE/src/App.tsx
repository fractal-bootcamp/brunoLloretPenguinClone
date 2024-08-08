import { useState } from "react";
import "./App.css";
import Room from "../components/common/Room";
import Main from "../components/pages/Main";
import "../components/pages/Main.css";
import "../components/common/NavBar.css";
import Melancholy from "../components/pages/Melancholy";

function App() {
  return (
    <>
      <div>
        {/* <Main /> */}
        {/* <Room
          width="1000px"
          height="1000px"
          backgroundColor="white" // Set to your desired background color
          borderRadius="0px" // Set to your desired border radius
          backgroundImage="../../src/assets/Follower_of_Jheronimus_Bosch_Christ_in_Limbo.jpg"
        /> */}
        <Melancholy
          width="2000px"
          height="2000px"
          backgroundColor="white" // Set to your desired background color
          borderRadius="0px"
        />
      </div>
    </>
  );
}

export default App;
