import React from 'react';
import { useStore } from 'react-redux';
import copy from 'copy-to-clipboard';
import Button from 'react-bootstrap/Button';
import { ClipboardIcon } from '../assets';

function CopyToClipboard(props) {
  const [hasCopied, setHasCopied] = React.useState(false);
  
  const store = useStore();

  const title = hasCopied ? 'Copied!' : 'Click to copy the values.';

  return (
    <Button
      variant="link"
      onClick={() => {
        const state = store.getState();
        const data= state.jsonData.matchedNodes.map((node) => node.value);
        if (copy(JSON.stringify(data))) {
          setHasCopied(true);
        } else {
          setHasCopied(false);
        }
      }}
      title="arfat"
    >
      <abbr style={{ cursor: 'pointer' }} title={title}>
        <ClipboardIcon width={'28px'} height={'28px'} />
      </abbr>
    </Button>
  );
}

export default CopyToClipboard;
