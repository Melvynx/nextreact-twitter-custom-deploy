'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { client } from '~/src/lib/client/client';
import { tweetKeys } from '~/src/lib/query/tweetQuery';
import { AddTweetForm } from './AddTweetForm';

type AddTweetProps = { tweetId?: string; session?: Session | null };

export const AddTweet = ({ tweetId, session }: AddTweetProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (content: string) =>
      client('/api/tweets', { method: 'POST', data: { content, tweetId } }),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: tweetId ? tweetKeys.getById(tweetId) : tweetKeys.all,
          refetchPage: tweetId ? undefined : (_, i) => i === 0,
        });
      },
    }
  );

  if (!session?.user) {
    return <p>Please login to add tweet</p>;
  }

  const handleSubmit = (content: string) => {
    mutation.mutate(content);
  };

  return (
    <AddTweetForm
      disabled={mutation.isLoading}
      user={session.user}
      onSubmit={handleSubmit}
    />
  );
};
