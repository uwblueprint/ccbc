import { NodemailerConfig } from "./types";

const config: NodemailerConfig = {
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    type: process.env.NODEMAILER_TYPE,
    user: process.env.NODEMAILER_USER,
    clientId: process.env.NODEMAILER_CLIENT_ID,
    clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
    refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
  },
};

export default config;
