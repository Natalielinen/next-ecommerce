CREATE TABLE "password_reset_tokens" (
	"identifier" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL
);
