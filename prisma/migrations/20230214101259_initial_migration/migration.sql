-- CreateTable
CREATE TABLE "User" (
    "name" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "displayName" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserFollowsUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    CONSTRAINT "UserFollowsUser_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserFollowsUser_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "tweetId" TEXT,
    CONSTRAINT "Tweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TweetsOnLikes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tweetId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TweetsOnLikes_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TweetsOnLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserFollowsUser_followerId_followingId_key" ON "UserFollowsUser"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "TweetsOnLikes_tweetId_userId_key" ON "TweetsOnLikes"("tweetId", "userId");
