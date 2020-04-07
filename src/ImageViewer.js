import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { propOr, pathOr } from 'ramda';

/**
 * Get the scale for this image.
 *
 * @param  {Object} file
 * @return {Number}
 */
const getScale = pathOr(1, ['scale', 0]);

/**
 * Get the rotation for this image.
 *
 * @param  {Object} file
 * @return {Number}
 */
const getRotation = propOr(0, 'rotate');

const getResponseLikePDF = imgRef => {
  const { clientWidth, clientHeight } = imgRef.current;

  return {
    numPages: 1,
    getPage: () => ({
      getViewport: () => ({
        width: clientWidth,
        height: clientHeight,
      }),
    }),
  };
};

/**
 * `ImageViewer` react component.
 *
 * @param  {Object}   params
 * @param  {Object}   params.file
 * @param  {String}   params.file.url
 * @param  {String}   params.file.data
 * @param  {Array}    params.file.scale
 * @param  {Number}   params.file.rotate
 * @param  {String}   params.file.mimeType
 * @param  {Array}    params.originalSizes
 * @param  {Function} params.onLoadSuccess
 */
const ImageViewer = ({ file, originalSizes, onLoadSuccess }) => {
  const imgRef = useRef(null);

  const scaleImage =
    !originalSizes[0] || !getScale(file)
      ? {}
      : {
          width: originalSizes[0].width * getScale(file),
          height: originalSizes[0].height * getScale(file),
        };

  return (
    <img
      ref={imgRef}
      onLoad={() => onLoadSuccess(getResponseLikePDF(imgRef))}
      src={file.url || `data:${file.mimeType};base64,${file.data}`}
      style={{
        ...scaleImage,
        transform: `rotate(${getRotation(file)}deg)`,
      }}
    />
  );
};

ImageViewer.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    data: PropTypes.string,
    scale: PropTypes.array,
    rotate: PropTypes.number,
    mimeType: PropTypes.string,
  }),
  originalSizes: PropTypes.array,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default ImageViewer;
