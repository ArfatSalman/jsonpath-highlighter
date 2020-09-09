import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JSONPath from '../../components/JSONPath';
import PathExpressionInput from '../../components/PathExpressionInput';
import reducer from '../../data/reducers';
import fixtureData from './fixtureData';
import { setJSONAndPathExpression } from '../../data/actions';

function render(ui, { store, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function createFixture(props) {
  const store = createStore(reducer);
  // Initialize the store
  store.dispatch(setJSONAndPathExpression(fixtureData, '$..*'));
  return render(
    <>
      <PathExpressionInput />
      <JSONPath />
    </>,
    { store }
  );
}

describe('JSONPath', () => {
  const expected = fixtureData.store.book;

  test('should render the data', () => {
    const screen = createFixture();
    expect(screen.getAllByText(`"fiction"`).length).toBe(3);
    expect(screen.getAllByText(`"reference"`).length).toBe(1);
    for (const { author, title, price } of expected) {
      expect(screen.getByText(`"${author}"`)).toBeInTheDocument();
      expect(screen.getByText(`"${title}"`)).toBeInTheDocument();
      expect(screen.getByText(price.toString())).toBeInTheDocument();
    }
  });

  test('should show error when an incorrect JSONPath is entered', () => {
    const incorrectPaths = ['$..', '...', '..$..', '$..type..', '.store', '()'];
    const screen = createFixture();
    const input = screen.getByTestId('jsonpath-input');
    userEvent.clear(input);
    expect(input).toHaveValue('');
    for (const path of incorrectPaths) {
      userEvent.type(input, path);
      expect(screen.getByText(/Parse Error/)).toBeInTheDocument();
      userEvent.clear(input);
      expect(screen.getByText(/Waiting for input/)).toBeInTheDocument();
    }
  });

  test('should show data when correct path is entered', () => {
    const correctPaths = [
      { path: '$.store', matched: 1 },
      { path: '$.store.book[*].author', matched: 4 },
      { path: '$..author', matched: 4 },
      { path: `$..['author']`, matched: 4 },
      { path: `$.store.*`, matched: 2 },
      { path: `$.store..price`, matched: 5 },
      { path: `$..book[(@.length-1)]`, matched: 1 }, // the last book
      { path: `$..book[0,1]`, matched: 2 },
    ];

    const screen = createFixture();
    const input = screen.getByTestId('jsonpath-input');
    userEvent.clear(input);

    for (const { path, matched } of correctPaths) {
      userEvent.type(input, path);
      expect(screen.getByText(new RegExp(`${matched} paths matched`)));
      userEvent.clear(input);
      expect(screen.getByText(/Waiting for input/)).toBeInTheDocument();
    }

    userEvent.type(input, '$.abcd');
    expect(screen.getByText(new RegExp(`No matches`)));
  });

  test('should hide or show the object when the checkbox is toggled', () => {
    const screen = createFixture();
    const checkbox = screen.getByTestId('store');

    userEvent.click(checkbox);

    for (const { author } of expected) {
      expect(screen.queryByText(author)).not.toBeInTheDocument();
    }

    userEvent.click(checkbox);

    for (const { author } of expected) {
      expect(screen.getByText(new RegExp(author))).toBeInTheDocument();
    }
  });
});
