/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_n4cZYfWNdMB3@ep-soft-bird-aenbgb8s-pooler.c-2.us-east-2.aws.neon.tech/AI_Content_Generator?sslmode=require&channel_binding=require",
  },
};
