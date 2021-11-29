export interface Author {
  fullName: string;
  displayName?: string | null;
  attribution?: string | null;
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

export interface Book {
  title: string;
  titlePrefix?: string | null;
  seriesOrder?: string | null;
  illustrator?: string[] | null;
  translator?: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: Author[];
  publishers: Publisher[];
  seriesName?: string | null;
}

export interface Tag {
  name: string;
}

export interface ReviewRequestDTO {
  body: string;
  coverImages: string[];
  byline: string;
  featured: boolean;
  // @TODO: uncomment when christine changes are merged
  // createdBy: number;
  publishedAt?: number | null;
  books: Book[];
  tags: Tag[];
}

export interface ReviewResponseDTO {
  reviewId: number;
  body: string;
  coverImages: string[];
  byline: string;
  featured: boolean;
  // @TODO: uncomment when christine changes are merged
  // createdBy: number;
  books: Book[];
  tags: Tag[];
  updatedAt: number;
  publishedAt: number | null;
}

export interface IReviewService {
  /**
   * create an Entity with the fields given in the DTO, return created Entity
   * @param review fields
   * @returns the created Review
   * @throws Error if creation fails
   */

  createReview(entity: ReviewRequestDTO): Promise<ReviewResponseDTO>;
}
