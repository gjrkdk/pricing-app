-- AlterTable
ALTER TABLE "Store" ADD COLUMN "unitPreference" TEXT NOT NULL DEFAULT 'mm';

-- CreateTable
CREATE TABLE "PriceMatrix" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceMatrix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breakpoint" (
    "id" TEXT NOT NULL,
    "matrixId" TEXT NOT NULL,
    "axis" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Breakpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatrixCell" (
    "id" TEXT NOT NULL,
    "matrixId" TEXT NOT NULL,
    "widthPosition" INTEGER NOT NULL,
    "heightPosition" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MatrixCell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductMatrix" (
    "id" TEXT NOT NULL,
    "matrixId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductMatrix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PriceMatrix_storeId_idx" ON "PriceMatrix"("storeId");

-- CreateIndex
CREATE INDEX "Breakpoint_matrixId_axis_idx" ON "Breakpoint"("matrixId", "axis");

-- CreateIndex
CREATE UNIQUE INDEX "Breakpoint_matrixId_axis_value_key" ON "Breakpoint"("matrixId", "axis", "value");

-- CreateIndex
CREATE INDEX "MatrixCell_matrixId_idx" ON "MatrixCell"("matrixId");

-- CreateIndex
CREATE UNIQUE INDEX "MatrixCell_matrixId_widthPosition_heightPosition_key" ON "MatrixCell"("matrixId", "widthPosition", "heightPosition");

-- CreateIndex
CREATE INDEX "ProductMatrix_matrixId_idx" ON "ProductMatrix"("matrixId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductMatrix_productId_key" ON "ProductMatrix"("productId");

-- AddForeignKey
ALTER TABLE "PriceMatrix" ADD CONSTRAINT "PriceMatrix_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Breakpoint" ADD CONSTRAINT "Breakpoint_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "PriceMatrix"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatrixCell" ADD CONSTRAINT "MatrixCell_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "PriceMatrix"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMatrix" ADD CONSTRAINT "ProductMatrix_matrixId_fkey" FOREIGN KEY ("matrixId") REFERENCES "PriceMatrix"("id") ON DELETE CASCADE ON UPDATE CASCADE;
