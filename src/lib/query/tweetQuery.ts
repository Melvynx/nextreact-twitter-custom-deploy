export const tweetKeys = {
  all: ['tweets'],
  getById: (id: string) => ['tweet', id],
  getByUser: (id: string) => ['tweets', 'user', id],
};