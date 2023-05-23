'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { TweetsNextButton } from '~/src/components/tweets/TweetsNextButton';
import { TweetWithLikes } from '~/src/components/tweets/TweetWithLikes';
import { client } from '~/src/lib/client/client';
import { tweetKeys } from '~/src/lib/query/tweetQuery';
import type { TlTweetsPage } from '~/src/lib/scheme/tweet';
import { TweetsScheme } from '~/src/lib/scheme/tweet';

const getTweets = async (signal?: AbortSignal, page = 0) =>
  client(`/api/tweets?page=${page}`, { signal, zodSchema: TweetsScheme });

const useInfiniteTweet = (defaultTweets: TlTweetsPage) =>
  useInfiniteQuery({
    queryKey: tweetKeys.all,
    queryFn: async ({ signal, pageParam }) => getTweets(signal, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialData: {
      pages: [defaultTweets],
      pageParams: [0],
    },
  });

type AppTlProps = {
  defaultTweets: TlTweetsPage;
};

export const TweetsTl = ({ defaultTweets }: AppTlProps) => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteTweet(defaultTweets);

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  return (
    <>
      {tweets.map((tweet) => (
        <TweetWithLikes key={tweet.id} tweet={tweet} />
      ))}
      <TweetsNextButton
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};
