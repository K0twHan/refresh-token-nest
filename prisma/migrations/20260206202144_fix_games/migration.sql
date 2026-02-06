/*
  Warnings:

  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `_GameToPurchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PurchaseToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameToPurchase" DROP CONSTRAINT "_GameToPurchase_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToPurchase" DROP CONSTRAINT "_GameToPurchase_B_fkey";

-- DropForeignKey
ALTER TABLE "_GameToUser" DROP CONSTRAINT "_GameToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToUser" DROP CONSTRAINT "_GameToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PurchaseToUser" DROP CONSTRAINT "_PurchaseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PurchaseToUser" DROP CONSTRAINT "_PurchaseToUser_B_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_GameToPurchase";

-- DropTable
DROP TABLE "_GameToUser";

-- DropTable
DROP TABLE "_PurchaseToUser";

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
