import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './File.module.css';
import { FileIcon } from '../../assets';

function File(props) {
  const { label, isLoading = false, onChange, hasError, errorMessage, ...rest } = props;

  return (
    <div className={styles.file}>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <label>
          <FileIcon width={'42px'} height={'42px'} /> {label}
          <input onChange={onChange} type="file" {...rest} />
        </label>
      )}
      {hasError ? <div>{errorMessage}</div> : null}
    </div>
  );
}

export default File;
