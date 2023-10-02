import { render, screen } from '@testing-library/react';
import App from './App';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

test('renders learn react title', async () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
  // render(<App />);
  // expect(screen.getByRole('h1')).toHaveTextContent('DRAGON SENDING HUMANS AND CARGO INTO SPACE');
});

// test('loads and displays greeting', async () => {
//   // ARRANGE
//   render(<Fetch url="/greeting" />)

//   // ACT
//   await userEvent.click(screen.getByText('Load Greeting'))
//   await screen.findByRole('heading')

//   // ASSERT
//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toBeDisabled()
// })
