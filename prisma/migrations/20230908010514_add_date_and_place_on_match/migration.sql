-- AlterTable
ALTER TABLE `Match` ADD COLUMN `date` DATETIME(3) NULL,
    ADD COLUMN `place` ENUM('GATO', 'SOCIAL') NULL;