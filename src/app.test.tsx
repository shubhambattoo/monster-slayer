import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { describe, expect } from 'vitest';

import App from './App';

describe('<App />', () => {
  it('should render the App', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { container } = render(<App />);

    expect(1).toBe(1);
  });
});
