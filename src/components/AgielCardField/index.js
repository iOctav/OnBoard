import Marker from "./Marker";
import IssueFieldValue from "./IssueFieldValue";
import PropTypes from "prop-types";
import Select from "@jetbrains/ring-ui/dist/select/select";

function AgileCardField({markerColor, value, marginLeft}) {
    return (
        <Select className="agile-card-enumeration-item"
                style={{ marginLeft: marginLeft + 'px'}}
                type="INLINE" filter={true} data={[]}>
            {markerColor && <Marker color={markerColor}/>}
            <IssueFieldValue>{value}</IssueFieldValue>
        </Select>
    );
}

AgileCardField.propTypes = {
    markerColor: PropTypes.string,
    value: PropTypes.string,
    marginLeft: PropTypes.number
}

export default AgileCardField
