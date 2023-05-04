import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotFound.module.css';

const NotFound = () => (
  <div className={styles.NotFound}>
    Looks like this website doesn't exist! That's odd
  </div>
);

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
