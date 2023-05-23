import { AddTweet } from '~/src/components/tweets/AddTweet';
import { TwitterLayout } from '~/src/components/tweets/TwitterLayout';
import { getTweets } from '~/src/db/tweets';
import { getSession } from '~/src/lib/auth/nextAuth';
import { TweetsTl } from './TweetsTl';

export default async function MainPage() {
  const session = await getSession();
  const defaultTweets = await getTweets(session?.user.id, 0);

  return (
    <TwitterLayout>
      <AddTweet session={session} />
      <TweetsTl defaultTweets={{ tweets: defaultTweets, nextPage: 1 }} />
    </TwitterLayout>
  );
}
