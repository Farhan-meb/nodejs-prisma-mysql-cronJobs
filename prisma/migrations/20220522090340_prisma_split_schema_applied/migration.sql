/*
  Warnings:

  - You are about to alter the column `post` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(191)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `post` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Testing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
