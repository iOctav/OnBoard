import PropTypes from 'prop-types';
import Select from '@jetbrains/ring-ui/dist/select/select';

function AgileCardField({customFieldId, data, value, marginLeft}) {
    const dataset = data?.map(item => ({key: item.id, label: item.name})) ?? [];
    return (
        <Select className="agile-card-enumeration-item"
                style={{ marginLeft: marginLeft + 'px'}}
                selected={dataset?.find(x => x.key === value)}
                type="INLINE" filter={true} data={dataset}>
        </Select>
    );
}

AgileCardField.propTypes = {
    customFieldId: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.string,
    marginLeft: PropTypes.number
}

export default AgileCardField
