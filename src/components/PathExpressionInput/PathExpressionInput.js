import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import MatchStatus from '../MatchStatus';
import { setJSONPathExpression } from '../../data/actions';
import { isValidJSONPathExpression } from '../../utils/jsonpath';
import useDebounce from '../../utils/custom-hooks/useDebounce';
import styles from './PathExpressionInput.module.css';

function PathExpressionInput(props) {
  const dispatch = useDispatch();
  const highlightedPath = useSelector(
    (state) => state.jsonData.highlightedPath
  );

  const [hasParseError, setParseError] = React.useState(false);
  const [jsonPath, setJsonPath] = React.useState(highlightedPath);
  const [isEmpty, setIsEmpty] = React.useState(false);

  const dispatchSetJSONPathExpression = useDebounce(
    (path) => dispatch(setJSONPathExpression(path)),
    200
  );

  return (
    <>
      <Form>
        <Form.Group style={{ marginBottom: 0 }} controlId="path">
          <Form.Label>
            <span className={styles.inputLabel}>JSONPath Expression</span>
          </Form.Label>
          <Form.Control
            name="path"
            data-testid="jsonpath-input"
            value={jsonPath}
            onChange={(event) => {
              const { value: path } = event.target;
              setJsonPath(path);
              if (path === '') {
                setIsEmpty(true);
                return;
              }
              if (isValidJSONPathExpression(path)) {
                // dispatch(setJSONPathExpression(path));
                dispatchSetJSONPathExpression(path);
                setParseError(false);
              } else {
                setParseError(true);
              }
              setIsEmpty(false);
            }}
            size="lg"
            type="text"
            isInvalid={hasParseError}
          />
        </Form.Group>
      </Form>
      <MatchStatus isEmpty={isEmpty} hasError={hasParseError} />
    </>
  );
}

export default PathExpressionInput;
