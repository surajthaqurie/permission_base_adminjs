-- CreateTable
CREATE TABLE "ResourcePermission" (
    "id" TEXT NOT NULL,
    "resource_name" TEXT NOT NULL,
    "read" BOOLEAN DEFAULT false,
    "write" BOOLEAN DEFAULT false,
    "update" BOOLEAN DEFAULT false,
    "delete" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ResourcePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourcePermission_id_key" ON "ResourcePermission"("id");

-- AddForeignKey
ALTER TABLE "ResourcePermission" ADD CONSTRAINT "ResourcePermission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
