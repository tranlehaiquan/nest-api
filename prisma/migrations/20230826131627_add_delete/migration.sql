-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "deleted" TIMESTAMP(3);
