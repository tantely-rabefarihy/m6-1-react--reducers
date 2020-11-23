import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);
  // const numOfRows = 6;
  // const seatsPerRow = 6;
  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())

      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  if (!hasLoaded) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      <>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const singleSeat = seats[seatId];

                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      seatId={seatId}
                      width={36}
                      height={36}
                      status={singleSeat.isBooked ? "unavailable" : "available"}
                      price={singleSeat.price}
                    />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  width: 50%;
  align-items: center;
  margin: 50px auto;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  align-self: center;
  margin-right: 10px;
  position: absolute;
  left: -70px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
