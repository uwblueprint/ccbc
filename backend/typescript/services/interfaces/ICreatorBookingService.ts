/**
 * Contains the basic details of a Creator Booking
 */
export interface CreatorBookingRequestDTO {
  creatorId: number;
  name: string;
  email: string;
  date: string;
  isTentative: boolean;
  isOneDay: boolean;
  ageGroup: string;
  audienceSize: number;
  subject: string;
  message: string;
}

export interface CreatorBookingResponseDTO {
  creatorId: number;
  name: string;
  email: string;
  date: string;
  isTentative: boolean;
  isOneDay: boolean;
  ageGroup: string;
  audienceSize: number;
  subject: string;
  message: string;
  sentAt: number;
}

export interface ICreatorBookingService {
  /**
   * send a booking email with the fields given in the DTO, return created booking details
   * @param creator booking DTO
   * @returns the created booking email
   * @throws Error if creation fails
   */
  addCreatorBooking(
    creatorBooking: CreatorBookingRequestDTO,
  ): Promise<CreatorBookingResponseDTO>;
}
