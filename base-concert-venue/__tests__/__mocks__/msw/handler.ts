import {
  type DefaultBodyType,
  type MockedRequest,
  type RestHandler,
  rest,
  RestRequest,
  PathParams,
} from 'msw';
import { readFakeData } from '../fakeData';
import { fakeUserReservations } from '../fakeData/userReservations';

interface ShowParams extends PathParams {
  showId: string;
}

interface UserReservationsParam extends PathParams {
  userId: string;
}

const handlers = [
  rest.get(
    'http://localhost:3000/api/shows/:showId',
    async (req: RestRequest<never, ShowParams>, res, ctx) => {
      const { fakeShows } = await readFakeData();
      const { showId } = req.params;
      //index /showId ==0 has seats available in fake data
      //index /showId=1 has No seats available in fake data
      return res(ctx.json({ show: fakeShows[+showId] }));
    }
  ),
  rest.get(
    'http://localhost:3000/api/users/:userId/reservations',
    async (req: RestRequest<never, UserReservationsParam>, res, ctx) => {
      const userReservations = fakeUserReservations.slice(0);
      return res(ctx.json({ userReservations }));
    }
  ),
] as RestHandler<MockedRequest<DefaultBodyType>>[];

export { handlers };
