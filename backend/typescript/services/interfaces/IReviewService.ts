export interface AuthorRequest {
  id?: number;
  fullName: string;
  displayName?: string | null;
  attribution?: string | null;
}

export interface AuthorResponse {
  id: number;
  fullName: string;
  displayName: string | null;
  attribution: string | null;
}

export interface PublisherRequest {
  id?: number;
  fullName: string;
  publishYear: number;
}

export interface PublisherResponse {
  id: number;
  fullName: string;
  publishYear: number;
}

export interface Format {
  format: string;
  price: string;
  isbn: string;
}

export interface Series {
  id?: number;
  name?: string | null;
}

export interface BookRequest {
  id?: number;
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
  publishers: PublisherRequest[];
  series: Series;
}

export interface BookResponse {
  id: number;
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
  publishers: PublisherResponse[];
  series: Series;
}

export interface TagRequest {
  id?: number;
  name: string;
}

export interface TagResponse {
  id: number;
  name: string;
}

export interface ReviewRequestDTO {
  body: string;
  byline: string;
  featured: boolean;
  createdBy: number;
  publishedAt?: number | null;
  books: BookRequest[];
  tags: TagRequest[];
}

export interface ReviewResponseDTO {
  reviewId: number;
  body: string;
  byline: string;
  featured: boolean;
  createdBy: number;
  books: BookResponse[];
  tags: TagResponse[];
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

  createReview(
    entity: ReviewRequestDTO,
    id?: string,
  ): Promise<ReviewResponseDTO>;
  getReview(id: string): Promise<ReviewResponseDTO>;
  getReviews(): Promise<ReviewResponseDTO[]>;
  updateReviews(id: string, entity: ReviewRequestDTO): Promise<void>;
  deleteReview(id: string): Promise<void>;
}
