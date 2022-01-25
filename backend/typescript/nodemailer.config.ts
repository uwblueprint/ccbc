import { NodemailerConfig } from "./types";

const config: NodemailerConfig = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.NODEMAILER_USER,
    clientId: process.env.NODEMAILER_CLIENT_ID,
    clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
    refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
  },
};

export default config;
