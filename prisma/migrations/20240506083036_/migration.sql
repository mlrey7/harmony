-- DropForeignKey
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_addressee_id_fkey";

-- AlterTable
ALTER TABLE "friendship" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_addressee_id_fkey" FOREIGN KEY ("addressee_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
