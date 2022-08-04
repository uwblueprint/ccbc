import { Request, Response, NextFunction } from "express";

/* 
checks the .env file to see if the givecloud webhook is enabled, 
works if GIVECLOUD_WEBHOOK_ENABLE has a value of 1, the route is disabled if the value is anything else or not present
*/
const isGiveCloudEnabled = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    if (process.env.GIVECLOUD_WEBHOOK_ENABLE !== "1") {
      return res.status(404).json({ error: "Path does not exist" });
    }
    return next();
  };
};

export default isGiveCloudEnabled
