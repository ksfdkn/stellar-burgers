import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrders,
  selectFeedLoading
} from '../../services/slices/feed/feedSlice';
import { fetchFeed } from '../../services/slices/feed/thunks/fetchFeed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectOrders);
  const isFeedLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  return (
    <>
      {isFeedLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
      )}
    </>
  );
};
