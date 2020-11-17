import React, { useContext, useEffect } from "react";
import TicketWidget from "./TicketWidget";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";

function App() {
  const {
    state: { numOfRows, seatsPerRow },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())

      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* This venue has {numOfRows} rows! This venue has {seatsPerRow} seats Per
      Row! */}
      <TicketWidget />
    </>
  );
}

export default App;
