import React from 'react';
import {useSelector} from 'react-redux';
import {selectLoadingCount} from '../redux/selectors/general';
import LoadingOverlay from './LoadingOverlay';

interface Props {}

const LoadingWrapper: React.FC<Props> = React.memo(props => {
  const loadingCount = useSelector(selectLoadingCount);

  return (
    <>
      {props.children}
      {loadingCount > 0 ? <LoadingOverlay /> : null}
    </>
  );
});
export default LoadingWrapper;
