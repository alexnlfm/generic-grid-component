import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Grid({
  cellsList,
  numberOfColumns,
  justifyGridContent,
  alignCellContent,
  cellMargin,
  cellPadding,
  cellBorder,
  cellBorderRadius,
  containerBackgroundColor,
  cellBackgroundColor
}) {
  let cellFlexBasisString = 'auto';

  if (!isNaN(parseInt(numberOfColumns))) {
    const calculatedColumnWidth = 100 / parseInt(numberOfColumns) + '%';
    cellFlexBasisString = calculatedColumnWidth;
    if (cellMargin) {
      cellFlexBasisString += ` - ${doubleSizeValue(cellMargin)}`;
    }
    if (cellPadding) {
      cellFlexBasisString += ` - ${doubleSizeValue(cellPadding)}`;
    }
    if (cellBorder) {
      const borderWidth = cellBorder.slice(0, cellBorder.indexOf(' '));
      cellFlexBasisString += ` - ${doubleSizeValue(borderWidth)}`;
    }
  }

  let justifyCellContent = 'flex-start';
  if (alignCellContent === 'center') {
    justifyCellContent = 'center';
  } else if (alignCellContent === 'right') {
    justifyCellContent = 'flex-end';
  }

  return (
    <MainContainer
      justifyContent={justifyGridContent}
      backgroundColor={containerBackgroundColor}
    >
      {cellsList.map((cellContent, i) => (
        <CellContaier
          key={i}
          numberOfColumns={numberOfColumns}
          justifyContent={justifyCellContent}
          cellMargin={cellMargin}
          cellPadding={cellPadding}
          border={cellBorder}
          borderRadius={cellBorderRadius}
          backgroundColor={cellBackgroundColor}
          flexBasisString={cellFlexBasisString}
        >
          {cellContent}
        </CellContaier>
      ))}
    </MainContainer>
  );
}
Grid.propTypes = {
  cellsList: PropTypes.array.isRequired,
  numberOfColumns: PropTypes.string,
  justifyGridContent: PropTypes.string,
  alignCellContent: PropTypes.string,
  cellMargin: PropTypes.string,
  cellPadding: PropTypes.string,
  cellBorder: PropTypes.string,
  cellBorderRadius: PropTypes.string,
  containerBackgroundColor: PropTypes.string,
  cellBackgroundColor: PropTypes.string
};

function doubleSizeValue(sizeString) {
  const indexOfFirstLetter = sizeString.search(/[^0-9]/);
  if (indexOfFirstLetter > 0) {
    const number = sizeString.slice(0, indexOfFirstLetter) * 2;
    const units = sizeString.slice(indexOfFirstLetter);
    return number + units;
  } else {
    return '0px';
  }
}

// -------------- Styled Components -------------- //

const MainContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.justifyContent};
  background-color: ${props => props.backgroundColor};
`;

const CellContaier = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-basis: calc(${props => props.flexBasisString});
  justify-content: ${props => props.justifyContent};
  margin: ${props => props.cellMargin};
  padding: ${props => props.cellPadding};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.backgroundColor};
`;
