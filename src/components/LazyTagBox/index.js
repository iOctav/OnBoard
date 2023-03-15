import PropTypes from 'prop-types';
import TagsInput from '@jetbrains/ring-ui/dist/tags-input/tags-input';

function LazyTagBox({lazyDataLoaderHook, lazyDataLoaderHookParams, makeDataSource, ...rest}) {
  const [getData] = lazyDataLoaderHook();
  return (<TagsInput
      dataSource={() => getData(lazyDataLoaderHookParams).unwrap().then(data => makeDataSource(data))}
      {...rest}/>
  );
}

LazyTagBox.propTypes = {
  lazyDataLoaderHook: PropTypes.func.isRequired,
  lazyDataLoaderHookParams: PropTypes.any,
  makeDataSource: PropTypes.func.isRequired
}

export default LazyTagBox
