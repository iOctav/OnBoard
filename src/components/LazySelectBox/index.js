import Select from '@jetbrains/ring-ui/dist/select/select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function LazySelectBox({lazyDataLoaderHook, lazyDataLoaderHookParams, makeDataset, ...rest}) {
  const [loading, setLoading] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [getData, results] = lazyDataLoaderHook();
  useEffect(() => {
    if(results && results.data) {
      setLoading(false);
      setDataset(makeDataset(results.data));
    }
    return () => {
      setDataset([]);
      setLoading(true);
    }
  },[results, makeDataset])
  return (<Select
    filter={true}
    data={dataset}
    loading={loading}
    onOpen={() => loading && getData(lazyDataLoaderHookParams)}
    {...rest}/>
  );
}

LazySelectBox.propTypes = {
  lazyDataLoaderHook: PropTypes.func.isRequired,
  lazyDataLoaderHookParams: PropTypes.any,
  makeDataset: PropTypes.func.isRequired
}

export default LazySelectBox
