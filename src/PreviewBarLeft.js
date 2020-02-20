import React from 'react';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';

import styles from './styles';
import Button from './Button';
import PageCount from './PageCount';

const disabledButton = {
  opacity: '.5',
  cursor: 'default',
};

const PreviewBarLeft = ({ totalPages, currentPage, onPageUp, onPageDown }) => (
  <div style={styles.previewBarLeft}>
    {/* Page to go up means going back. */}
    <Button
      onClick={onPageUp}
      disabled={currentPage === 1}
      style={currentPage === 1 ? disabledButton : {}}
    >
      <ChevronUp />
    </Button>

    {/* Page to go down means going next. */}
    <Button
      onClick={onPageDown}
      disabled={currentPage === totalPages}
      style={currentPage === totalPages ? disabledButton : {}}
    >
      <ChevronDown />
    </Button>

    <PageCount current={currentPage} total={totalPages} />
  </div>
);

export default PreviewBarLeft;
