CREATE TABLE "devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_name" varchar(255),
	"device_token" varchar(255),
	"last_active" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "max_devices" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;