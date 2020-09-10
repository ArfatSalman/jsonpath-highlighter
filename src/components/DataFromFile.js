import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setJSONData as setJSONDataAction } from '../data/actions';
import { readFileAsJSON } from '../utils/readAsJson';
import File from './File';

function DataFromFile(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fileError, setFileError] = React.useState(false);

  const setJSONData = useCallback((data) => dispatch(setJSONDataAction(data)), [
    dispatch,
  ]);

  return (
    <File
      onChange={async (event) => {
        setIsLoading(true);
        try {
          const data = await readFileAsJSON(event.target.files.item(0));
          setJSONData(data);
          setFileError(false);
        } catch (ex) {
          setFileError(true);
        } finally {
          setIsLoading(false);
        }
      }}
      label="Upload File"
      accept="application/json"
      id="json-file-upload"
      isLoading={isLoading}
      hasError={fileError}
      errorMessage={`The file is either not JSON or couldn't be read. Please try again.`}
    />
  );
}

export default DataFromFile;
