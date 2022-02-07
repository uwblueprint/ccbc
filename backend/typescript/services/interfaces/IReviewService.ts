export interface AuthorRequest {
  fullName: string;
  displayName?: string | null;
  attribution?: string | null;
}

export interface AuthorResponse {
  fullName: string;
  displayName: string | null;
  attribution: string | null;
}

export interface Publisher {
  fullName: string;
  publishYear: number;
}

export interface Format {
  format: string;
  price: string;
  isbn: string;
}

export interface BookRequest {
  title: string;
  coverImage: string;
  titlePrefix?: string | null;
  seriesOrder?: string | null;
  illustrator?: string[] | null;
  translator?: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorRequest[];
  publishers: Publisher[];
  seriesName?: string | null;
}

export interface BookResponse {
  title: string;
  coverImage: string;
  titlePrefix: string | null;
  seriesOrder: string | null;
  illustrator: string[] | null;
  translator: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorResponse[];
  publishers: Publisher[];
  seriesName: string | null;
}

export interface Tag {
  name: string;
}

/**
 * Contains the basic details of a User
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ReviewRequestDTO {
  body: string;
  byline: string;
  featured: boolean;
  createdBy: number;
  publishedAt?: number | null;
  books: BookRequest[];
  tags: Tag[];
}

export interface ReviewResponseDTO {
  reviewId: number;
  body: string;
  byline: string;
  featured: boolean;
  createdBy?: number | null;
  createdByUser?: User | null;
  books: BookResponse[];
  tags: Tag[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
}

export interface IReviewService {
  /**
   * create a review with the fields given in the DTO, return created review
   * @param review fields
   * @returns the created Review
   * @throws Error if creation fails
   */

  createReview(entity: ReviewRequestDTO): Promise<ReviewResponseDTO>;
  getReview(id: string): Promise<ReviewResponseDTO>;
  getReviews(): Promise<ReviewResponseDTO[]>;
  deleteReview(id: string): Promise<void>;
}
