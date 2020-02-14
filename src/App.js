import React, { useState } from 'react';
import styled from 'styled-components';

import Grid from './components/Grid';

import moviesData from './data';
import { DARK_BLUE, LIGHT_BLUE, RED } from './styles/theme';

const cardsArray = moviesData.map(movie => (
  <div>
    <h2>
      {movie.Title} ({movie.Year})
    </h2>
    <div>{movie.Genre}</div>
    <div>
      Directed by <strong>{movie.Director}</strong>
    </div>
    <p>{movie.Plot}</p>
  </div>
));

export default function App() {
  const [numberOfColumns, setNumberOfColumns] = useState('0');
  const [justifyGridContent, setJustifyGridContent] = useState('space-around');
  const [cellMargin, setCellMargin] = useState('10px');
  const [cellPadding, setCellPadding] = useState('5px');
  const [containerWidth, setContainerWidth] = useState('100%');

  function inputChangeHandler(e) {
    if (e.target.id === 'number-of-columns') {
      setNumberOfColumns(e.target.value);
    }
    if (e.target.id === 'justify-grid-content') {
      setJustifyGridContent(e.target.value);
    }
    if (e.target.id === 'cell-margin') {
      setCellMargin(e.target.value);
    }
    if (e.target.id === 'cell-padding') {
      setCellPadding(e.target.value);
    }
    if (e.target.id === 'container-width') {
      setContainerWidth(e.target.value);
    }
  }

  return (
    <>
      <PlaygroundContainer>
        <h1>Playground Controls</h1>
        <StyledDiv>
          <InputContainer>
            <label>Number of columns</label>
            <input
              type="range"
              id="number-of-columns"
              min="0"
              max="12"
              value={numberOfColumns}
              onChange={inputChangeHandler}
            />
            <span>{numberOfColumns}</span>
          </InputContainer>
          <InputContainer>
            <label>Justify grid content</label>
            <select
              id="justify-grid-content"
              value={justifyGridContent}
              onChange={inputChangeHandler}
            >
              <option value="flex-start">Start</option>
              <option value="flex-end">End</option>
              <option value="center">Center</option>
              <option value="space-between">Space between</option>
              <option value="space-around">Space around</option>
              <option value="space-evenly">Space evenly</option>
            </select>
          </InputContainer>
          <InputContainer>
            <label>Cell margin</label>
            <input
              type="text"
              id="cell-margin"
              value={cellMargin}
              onChange={inputChangeHandler}
            />
          </InputContainer>
          <InputContainer>
            <label>Cell padding</label>
            <input
              type="text"
              id="cell-padding"
              value={cellPadding}
              onChange={inputChangeHandler}
            />
          </InputContainer>
          <InputContainer>
            <label>Container width</label>
            <input
              type="text"
              id="container-width"
              value={containerWidth}
              onChange={inputChangeHandler}
            />
          </InputContainer>
        </StyledDiv>
      </PlaygroundContainer>
      <hr />

      <GridContainer width={containerWidth}>
        <Grid
          cellsList={cardsArray}
          numberOfColumns={numberOfColumns}
          justifyGridContent={justifyGridContent}
          alignCellContent="left"
          cellMargin={cellMargin}
          cellPadding={cellPadding}
          cellBorder={`2px solid ${RED}`}
          cellBorderRadius="10px"
          containerBackgroundColor={DARK_BLUE}
          cellBackgroundColor={LIGHT_BLUE}
        />
      </GridContainer>
    </>
  );
}

// -------------- Styled Components -------------- //

const PlaygroundContainer = styled.div`
  background-color: ${LIGHT_BLUE};
  font-size: 1.1rem;
  text-align: center;
`;

const StyledDiv = styled.div`
  display: flex;
  padding: 10px 0;
`;

const InputContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
  border-right: 2px solid ${DARK_BLUE};
  border-left: 2px solid ${DARK_BLUE};
`;

const GridContainer = styled.div`
  width: ${props => props.width};
`;
