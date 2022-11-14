import Marker from "./Marker";
import IssueFieldValue from "./IssueFieldValue";
import PropTypes from "prop-types";

function AgileCardField({markerColor, value, marginLeft}) {
    return (
        <span className="agile-card-enumeration-item" style={{ marginLeft: marginLeft + 'px'}}>
            {markerColor && <Marker color={markerColor}/>}
            <IssueFieldValue>{value}</IssueFieldValue>
        </span>
    );
}

AgileCardField.propTypes = {
    markerColor: PropTypes.string,
    value: PropTypes.string,
    marginLeft: PropTypes.number
}

export default AgileCardField
