import Select from '@jetbrains/ring-ui/dist/select/select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function LazySelectBox({type, label, selected, lazyDataLoaderHook, makeDataset, ...rest}) {
  const [loading, setAgilesLoading] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [getData, results] = lazyDataLoaderHook();
  useEffect(() => {
    if(results && results.data) {
      setAgilesLoading(false);
      setDataset(makeDataset(results.data));
    }
  },[results])
  return (<Select
    type={type}
    label={label}
    filter={true}
    data={dataset}
    selected={selected}
    loading={loading}
    onOpen={() => loading && getData()}
    {...rest}/>
  );
}

LazySelectBox.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.object,
  lazyDataLoaderHook: PropTypes.func,
  makeDataset: PropTypes.func,
}

export default LazySelectBox
