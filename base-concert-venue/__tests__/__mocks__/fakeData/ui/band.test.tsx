import { render, screen } from '@testing-library/react';
import Band from '@/pages/bands/[bandId]';
import { readFakeData } from '..';

it('should have the band item listed', async () => {
  const {
    fakeBands: [firstBand],
  } = await readFakeData();
  render(<Band error={null} band={firstBand} />);

  const heading = screen.getByRole('heading', {
    name: /The Wandering Bunnies/i,
  });
  expect(heading).toBeInTheDocument();
});

it('should contain render a error message when an error get passed', () => {
  const errorMessage = 'Something went wrong while rendering band';
  render(<Band error={errorMessage} band={null} />);

  const heading = screen.getByRole('heading', {
    name: RegExp(errorMessage, 'i'),
  });
  expect(heading).toBeInTheDocument();
});
