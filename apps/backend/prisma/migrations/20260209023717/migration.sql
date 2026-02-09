/*
  Warnings:

  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - Changed the type of `provider` on the `OAuthPendingRegistration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE', 'GITHUB');

-- DropIndex
DROP INDEX "User_githubId_key";

-- DropIndex
DROP INDEX "User_googleId_key";

-- AlterTable
ALTER TABLE "OAuthPendingRegistration" DROP COLUMN "provider",
ADD COLUMN     "provider" "AuthProvider" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubId",
DROP COLUMN "googleId";

-- CreateTable
CREATE TABLE "RegistrationType" (
    "userId" INTEGER NOT NULL,
    "type" "AuthProvider" NOT NULL,
    "value" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RegistrationType_pkey" PRIMARY KEY ("type","value")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationType_userId_type_key" ON "RegistrationType"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthPendingRegistration_provider_providerId_key" ON "OAuthPendingRegistration"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "RegistrationType" ADD CONSTRAINT "RegistrationType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
