import { Sequelize } from "sequelize-typescript";
import nodemailerConfig from "../../nodemailer.config";
import logger from "../../utilities/logger";
import IEmailService from "../interfaces/emailService";
import {
  CreatorBookingRequestDTO,
  CreatorBookingResponseDTO,
  ICreatorBookingService,
} from "../interfaces/ICreatorBookingService";
import PgUser from "../../models/user.model";
import PgCreator from "../../models/creator.model";
import EmailService from "./emailService";
import { sequelize } from "../../umzug";

const emailService: IEmailService = new EmailService(nodemailerConfig);
const Logger = logger(__filename);

class CreatorBookingService implements ICreatorBookingService {
  db: Sequelize;

  constructor(db: Sequelize = sequelize) {
    this.db = db;
    if (db !== sequelize) sequelize.close(); // Using test db instead of main db
  }

  // eslint-disable-next-line class-methods-use-this
  async addCreatorBooking(
    creatorBooking: CreatorBookingRequestDTO,
  ): Promise<CreatorBookingResponseDTO> {
    let creator: PgCreator | null;
    let user: PgUser | null;
    let authorEmail: string | null;

    try {
      authorEmail = await this.db.transaction(async (t) => {
        creator = await PgCreator.findByPk(creatorBooking.creatorId, {
          transaction: t,
          include: [{ all: true, nested: true }],
        });

        if (!creator) {
          throw new Error(`Creator id ${creatorBooking.creatorId} not found`);
        } else {
          user = await PgUser.findByPk(creator.user_id, {
            transaction: t,
            include: [{ all: true, nested: true }],
          });
        }
        return user?.email || "";
      });

      const emailBody = `
      Hello,
      <br><br>
      You have received a request from ${creatorBooking.name} for ${creatorBooking.date}:
      <ul>
        <li>Is this event tentative? ${creatorBooking.isTentative}</li>
        <li>Is this event for one day? ${creatorBooking.isOneDay}</li>
        <li>Age Group: ${creatorBooking.ageGroup}</li>
        <li>Audience Size: ${creatorBooking.audienceSize}</li>
      </ul>

      Message from the requester:
      ${creatorBooking.name}

      Please message ${creatorBooking.name} at ${creatorBooking.email} to learn more and confirm details.
      <br><br>
      Thank you
      <br>
      CCBC`;

      emailService.sendEmail(
        authorEmail,
        `New Booking Request - ${creatorBooking.subject}`,
        emailBody,
      );

      const response = {
        ...creatorBooking,
        sentAt: new Date(),
      } as unknown as CreatorBookingResponseDTO;
      return await Promise.resolve(response);
    } catch (error) {
      Logger.error(
        `Failed to send creator booking request for user with email, ${creatorBooking.email}`,
      );
      throw error;
    }
  }
}

export default CreatorBookingService;
