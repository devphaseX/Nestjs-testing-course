import { screen, render } from '@testing-library/react';
import { UserReservations } from '@/components/user/UserReservations';

it('should include a purchase button when there are reservation available', async () => {
  render(<UserReservations userId={1} />);
  const button = await screen.findByRole('button', {
    name: /Purchase more tickets/i,
  });
  expect(button).toBeInTheDocument();
});
