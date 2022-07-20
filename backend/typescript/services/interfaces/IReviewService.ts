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

export interface Genre {
  name: string;
}

export interface Format {
  format: string;
  price: number;
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
  seriesOrder?: number | null;
  illustrator?: string[] | null;
  translator?: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorRequest[];
  genres?: Genre[] | null;
  publishers: PublisherRequest[];
  series: Series;
  tags?: Tag[] | null;
}

export interface Tag {
  name: string;
}

export interface BookResponse {
  id: number;
  title: string;
  coverImage: string;
  titlePrefix: string | null;
  seriesOrder: number | null;
  illustrator: string[] | null;
  translator: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorResponse[];
  genres: Genre[];
  publishers: PublisherResponse[];
  series: Series;
  tags: Tag[];
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
}

export interface RetrieveReviewResponseDTO {
  totalReviews: number;
  totalPages: number;
  currentPage: number;
  reviews: ReviewResponseDTO[];
}

export interface ReviewResponseDTO {
  reviewId: number;
  body: string;
  byline: string;
  featured: boolean;
  createdBy?: number | null;
  createdByUser?: User | null;
  books: BookResponse[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
}

export interface IReviewService {
  /**
   * create a Review with the fields given in the DTO, return created Review
   * @param review DTO
   * @returns the created review
   * @throws Error if creation fails
   */
  createReview(review: ReviewRequestDTO): Promise<ReviewResponseDTO>;

  /**
   * retrieve the Review with the given id
   * @param id review id
   * @returns requested Review
   * @throws Error if retrieval fails
   */
  getReview(id: string): Promise<ReviewResponseDTO>;

  /**
   * retrieve all Reviews
   * @param page number of pages
   * @param size number of records in a page
   * @returns returns array of Reviews + metadata of pages
   * @throws Error if retrieval fails
   */
  getReviews(page: string, size: string): Promise<RetrieveReviewResponseDTO>;

  /**
   * update the Review with the given id with fields in the DTO, return updated Review
   * @param id review id
   * @param review Updated Review
   * @returns the updated Review
   * @throws Error if update fails
   */
  updateReviews(id: string, review: ReviewRequestDTO): Promise<void>;

  /**
   * delete the review with the given id
   * @param id review id
   * @throws Error if deletion fails
   */
  deleteReview(id: string): Promise<void>;
}
