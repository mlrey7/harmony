/*
  Warnings:

  - Added the required column `channel_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "channel" ADD COLUMN     "pinned_messages_ids" TEXT[];

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "channel_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
