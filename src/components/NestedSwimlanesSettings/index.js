import PropTypes from 'prop-types';
import NestedSwimlanesList from './NestedSwimlanesList';

function NestedSwimlanesSettings({agileId, projectShortNames}) {
  return (<NestedSwimlanesList agileId={agileId} projectShortNames={projectShortNames}/>);
}

NestedSwimlanesSettings.propTypes = {
  agileId: PropTypes.string.isRequired,
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NestedSwimlanesSettings;