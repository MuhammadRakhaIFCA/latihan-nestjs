-- CreateTable
CREATE TABLE "testmodel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "testmodel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testmodel_name_key" ON "testmodel"("name");
