import { screen, render } from '@testing-library/react';
import { Reservation } from '@/components/reservations/Reservation';

it('should show the correct number of available seats', async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);
  const seatCountText = await screen.findByText(/10 seats left/i);
  expect(seatCountText).toBeInTheDocument();
});

it('should show no reservation message and `sold out` message when the reservation is sold out', async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);

  const soldOutMessage = await screen.findByRole('heading', {
    name: /sold out/i,
  });

  expect(soldOutMessage).toBeInTheDocument();

  const purchaseButton = screen.queryByRole('button', { name: /purchase/i });
  expect(purchaseButton).not.toBeInTheDocument();
});
