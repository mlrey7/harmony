-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_reply_to_id_fkey";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "reply_to_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_reply_to_id_fkey" FOREIGN KEY ("reply_to_id") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
