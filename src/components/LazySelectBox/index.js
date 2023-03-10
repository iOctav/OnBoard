import Select from '@jetbrains/ring-ui/dist/select/select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function LazySelectBox({lazyDataLoaderHook, lazyDataLoaderHookParams, makeDataset, ...rest}) {
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
    filter={true}
    data={dataset}
    loading={loading}
    onOpen={() => loading && getData(lazyDataLoaderHookParams)}
    {...rest}/>
  );
}

LazySelectBox.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  lazyDataLoaderHook: PropTypes.func,
  lazyDataLoaderHookParams: PropTypes.any,
  makeDataset: PropTypes.func
}

export default LazySelectBox
