import React from "react";
import seatAvailable from "../assets/seat-available.svg";
import styled from "styled-components";

export const Seat = ({ seatId, seatStatus, seatPrice }) => {
  return (
    <>
      <SeatImg alt="seats" src={seatAvailable} />
    </>
  );
};

const SeatImg = styled.img``;
