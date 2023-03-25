import { useSelector } from 'react-redux';
import { selectSwimlanesDepth } from '../../features/nestedSwimlanes/nestedSwimlanesSlice';

function FakeTableCells() {
  const swimlanesDepth = useSelector(selectSwimlanesDepth);
  const cells = [];
  for (let i = 0; i < swimlanesDepth - 1; i++) {
    cells.push(<td key={`fake-cell-${i}`} />);
  }
  return <>{cells}</>;
}

export default FakeTableCells;