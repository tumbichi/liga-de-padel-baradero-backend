/*
  Warnings:

  - Added the required column `beginsAt` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endsAt` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tournament` ADD COLUMN `beginsAt` DATETIME(3) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `endsAt` DATETIME(3) NOT NULL;
