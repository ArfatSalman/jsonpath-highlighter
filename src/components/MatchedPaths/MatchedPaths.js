import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Value from '../entries/Value';
import styles from './MatchedPaths.module.css';

function MatchedPaths(props) {
  const nodes = useSelector(state => state.jsonData.matchedNodes);

  const classNames = cn(
    'table',
    'table-sm',
    'table-borderless',
    styles.matchedPaths
  );

  return (
    <div className={cn('table-responsive', styles.tableResponsive)}>
      <table className={classNames}>
        <thead className="thead-dark">
          <tr>
            <th colSpan={2} scope="col">
              Path
            </th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => {
            const { path, value } = node;
            const pathString = path.slice(1).join('.');
            return (
              <tr key={pathString}>
                <th colSpan={2}>{pathString}</th>
                <td>
                  <Value>{value}</Value>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MatchedPaths;
