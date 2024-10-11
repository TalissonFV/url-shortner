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
    "createdBy" TEXT,
    "clickedAmount" INTEGER NOT NULL,
    CONSTRAINT "Url_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Url" ("clickedAmount", "createdAt", "createdBy", "deletedAt", "id", "originUrl", "short_id", "updatedAt") SELECT "clickedAmount", "createdAt", "createdBy", "deletedAt", "id", "originUrl", "short_id", "updatedAt" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_short_id_key" ON "Url"("short_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
