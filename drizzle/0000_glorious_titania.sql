CREATE TABLE "Comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"body" text NOT NULL,
	"authorId" uuid NOT NULL,
	"postId" uuid NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deleted" timestamp
);
--> statement-breakpoint
CREATE TABLE "Follows" (
	"followerId" uuid NOT NULL,
	"followingId" uuid NOT NULL,
	CONSTRAINT "Follows_followerId_followingId_pk" PRIMARY KEY("followerId","followingId")
);
--> statement-breakpoint
CREATE TABLE "_PostToTag" (
	"A" uuid NOT NULL,
	"B" uuid NOT NULL,
	CONSTRAINT "_PostToTag_A_B_pk" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "Post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"body" text NOT NULL,
	"published" boolean DEFAULT false,
	"authorId" uuid NOT NULL,
	"slug" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deleted" timestamp,
	CONSTRAINT "Post_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "Tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "Tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "UserFavoriteComment" (
	"userId" uuid NOT NULL,
	"commentId" uuid NOT NULL,
	CONSTRAINT "UserFavoriteComment_userId_commentId_pk" PRIMARY KEY("userId","commentId")
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"image" text,
	"salt" text NOT NULL,
	"hash" text NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email"),
	CONSTRAINT "User_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_User_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_Post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_User_id_fk" FOREIGN KEY ("followerId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_User_id_fk" FOREIGN KEY ("followingId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_Post_id_fk" FOREIGN KEY ("A") REFERENCES "public"."Post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_Tag_id_fk" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_User_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "UserFavoriteComment" ADD CONSTRAINT "UserFavoriteComment_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "UserFavoriteComment" ADD CONSTRAINT "UserFavoriteComment_commentId_Comment_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."Comment"("id") ON DELETE no action ON UPDATE no action;