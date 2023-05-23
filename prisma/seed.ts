import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // loop for 10 times
  const usersPromises = [];
  for (let index = 0; index < 10; index++) {
    const user = {
      username: faker.internet.userName(),
      image: faker.image.avatar(),
      displayName: faker.name.firstName(),
      bio: faker.lorem.paragraph(),
      location: faker.address.city(),
      email: faker.internet.email(),
    };
    usersPromises.push(
      prisma.user.create({
        data: user,
      })
    );
  }

  const users = await Promise.all(usersPromises);

  // loop for 100 times
  const tweetsPromises = [];
  for (let index = 0; index < 100; index++) {
    const randomUserIndex = faker.datatype.number({
      min: 0,
      max: users.length - 1,
    });

    const randomWorldCount = faker.datatype.number({
      min: 5,
      max: 12,
    });
    const tweet = {
      content: faker.lorem.sentence(randomWorldCount),
      userId: users[randomUserIndex].id,
    };

    tweetsPromises.push(
      prisma.tweet.create({
        data: tweet,
      })
    );
  }

  await Promise.all(tweetsPromises);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);

    await prisma.$disconnect();

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
