import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './MatchStatus.module.css';

function MatchStatus(props) {
  const { hasError, isEmpty } = props;
  const { matchedLength, dataLength } = useSelector((state) => {
    const {
      jsonData: { matchedNodes, data },
    } = state;
    const matchedLength = matchedNodes.length;

    return {
      matchedLength,
      dataLength: Object.keys(data).length,
    };
  });
  const errorStatus = 'Parse Error: Enter correct JSONPath Expression.';
  const emptyString = 'Waiting for input...';
  const matchStatus = `${matchedLength} paths matched.`;
  const dataInfo = `No matches. ${dataLength} total top level items. `;

  let status;
  let className = styles.info;
  if (isEmpty) {
    status = emptyString;
  } else if (hasError) {
    status = errorStatus;
    className = styles.error;
  } else if (matchedLength > 0) {
    status = matchStatus;
    className = styles.match;
  } else {
    status = dataInfo;
  }
  return (
    <div className={cn(styles.matchStatus, className)}>Status: {status}</div>
  );
}

export default MatchStatus;
