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
    "createdBy" TEXT NOT NULL
);
INSERT INTO "new_Url" ("createdAt", "createdBy", "deletedAt", "id", "originUrl", "short_id", "updatedAt") SELECT "createdAt", "createdBy", "deletedAt", "id", "originUrl", "short_id", "updatedAt" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
