-- CreateTable
CREATE TABLE "EmailVerification" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthPendingRegistration" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "tempToken" TEXT NOT NULL,
    "providerEmail" TEXT,
    "providerName" TEXT,
    "profileImage" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OAuthPendingRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailVerification_email_idx" ON "EmailVerification"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthPendingRegistration_tempToken_key" ON "OAuthPendingRegistration"("tempToken");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthPendingRegistration_provider_providerId_key" ON "OAuthPendingRegistration"("provider", "providerId");
