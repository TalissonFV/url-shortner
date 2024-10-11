/*
  Warnings:

  - Added the required column `clickedAmount` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originUrl" TEXT NOT NULL,
    "short_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    "createdBy" TEXT NOT NULL,
    "clickedAmount" INTEGER NOT NULL
);
INSERT INTO "new_Url" ("createdAt", "createdBy", "deletedAt", "id", "originUrl", "short_id", "updatedAt") SELECT "createdAt", "createdBy", "deletedAt", "id", "originUrl", "short_id", "updatedAt" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_short_id_key" ON "Url"("short_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
