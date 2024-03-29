import PropTypes from 'prop-types';

function FakeTableCells({swimlanesDepth}) {
  const cells = [];
  for (let i = 0; i < swimlanesDepth; i++) {
    cells.push(<td data-testid="fake-table-cell" key={`fake-cell-${i}`} />);
  }
  return <>{cells}</>;
}

FakeTableCells.propTypes = {
  swimlanesDepth: PropTypes.number,
}

export default FakeTableCells;