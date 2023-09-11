/*
  Warnings:

  - You are about to drop the `_MatchToPlayer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MatchToPlayer" DROP CONSTRAINT "_MatchToPlayer_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToPlayer" DROP CONSTRAINT "_MatchToPlayer_B_fkey";

-- DropTable
DROP TABLE "_MatchToPlayer";

-- CreateTable
CREATE TABLE "_couple1" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_couple2" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_couple1_AB_unique" ON "_couple1"("A", "B");

-- CreateIndex
CREATE INDEX "_couple1_B_index" ON "_couple1"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_couple2_AB_unique" ON "_couple2"("A", "B");

-- CreateIndex
CREATE INDEX "_couple2_B_index" ON "_couple2"("B");

-- AddForeignKey
ALTER TABLE "_couple1" ADD CONSTRAINT "_couple1_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_couple1" ADD CONSTRAINT "_couple1_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_couple2" ADD CONSTRAINT "_couple2_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_couple2" ADD CONSTRAINT "_couple2_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
