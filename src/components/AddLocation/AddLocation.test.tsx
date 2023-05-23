import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddLocation } from './AddLocation';
import * as ReactQuery from 'react-query';
const useQueryMock = jest.spyOn(ReactQuery, 'useQueryClient').mockImplementation();

test('loads and displays greeting', async () => {
  render(<AddLocation handleClose={() => {}} />);
  
  expect(
    screen.getByRole('heading', {
      name: /add a new location/i,
    })
  ).toBeVisible();
  expect(screen.getByText(/location name:/i)).toBeVisible();
  expect(screen.getByPlaceholderText(/location name/i)).toBeVisible();
  expect(screen.getByText(/latitute:/i)).toBeVisible();
  expect(screen.getByPlaceholderText(/latitude/i)).toBeVisible();
  expect(screen.getByText(/Longitude:/i)).toBeVisible();
  expect(screen.getByPlaceholderText(/Longitude/i)).toBeVisible();
  expect(
    screen.getByRole('button', {
      name: /submit/i,
    })
  ).toBeVisible();
});
