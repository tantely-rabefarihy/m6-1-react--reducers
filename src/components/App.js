import React from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import TicketWidget from "./TicketWidget";

import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";

import "tippy.js/dist/tippy.css";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />

      <Centered>
        <TicketWidget />
      </Centered>
    </>
  );
}

const Centered = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
