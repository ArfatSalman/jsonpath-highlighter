import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {
  toggleExpandAll as toggleExpandAllAction,
  toggleShowOnlyMatchedProperties as toggleMatchPropertiesAction,
  setHighlightColor,
} from '../../data/actions';
import useDebounce from '../../utils/custom-hooks/useDebounce'

function Settings(props) {
  const showOnlyMatchedProperties = useSelector(state => state.settings.showOnlyMatchedProperties);
  const expandAll = useSelector(state => state.settings.expandAll);
  const highlightColor = useSelector(state => state.settings.highlightColor);

  const dispatch = useDispatch();
  const toggleExpandAll = useCallback(() => dispatch(toggleExpandAllAction()), [
    dispatch,
  ]);
  const toggleShowOnlyMatchedProperties = useCallback(
    () => dispatch(toggleMatchPropertiesAction()),
    [dispatch]
  );

  const throttledSetHighlightColor = useDebounce(
    (value) => dispatch(setHighlightColor(value)),
    500
  );

  return (
    <Form>
      <Form.Group className="text-light" controlId="show-only-matched-properties">
        <Form.Check
          checked={showOnlyMatchedProperties}
          onChange={toggleShowOnlyMatchedProperties}
          label="Show only matched properties"
        />
      </Form.Group>
      <Form.Group className="text-light" controlId="expand-all">
        <Form.Check
          value={expandAll}
          onChange={toggleExpandAll}
          label="Expand All"
        />
      </Form.Group>
      <Form.Row className="align-items-center">
        <Col md="auto">
          <Form.Label className="text-light" htmlFor="highlight-colors">Highlight Colors</Form.Label>
        </Col>
        <Col>
          <Form.Control
            value={highlightColor}
            onChange={(event) => {
              throttledSetHighlightColor(event.target.value)
            }}
            id="highlight-colors"
            type="color"
          />
        </Col>
      </Form.Row>
    </Form>
  );
}

export default Settings;
