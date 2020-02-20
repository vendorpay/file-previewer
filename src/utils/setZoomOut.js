import * as R from 'ramda';

const SCALE_FACTOR = 0.25;
const SCALE_ABSOLUTE_MIN = 0.25;

/**
 * Reduce the document scale by 25%.
 *
 * @param  {Object} files
 * @return {Object}
 */
const setZoomOut = R.converge(R.assoc('scale'), [
  R.compose(
    R.max(SCALE_ABSOLUTE_MIN),
    R.subtract(R.__, SCALE_FACTOR),
    R.propOr(1, 'scale'),
  ),
  R.identity,
]);

export default setZoomOut;
