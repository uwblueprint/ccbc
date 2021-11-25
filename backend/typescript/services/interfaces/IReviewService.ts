export interface Author {
  fullName: string;
  displayName?: string;
  attribution?: string;
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
  titlePrefix?: string;
  seriesOrder?: string;
  illustrator?: string[];
  translator?: string[];
  formats: Format[];
  minAge: number;
  maxAge: number;
  authors: Author[];
  publishers: Publisher[];
  seriesName?: string;
}

export interface Tag {
  name: string;
}

export interface ReviewRequestDTO {
  body: string;
  coverImages: string[];
  byline: string;
  featured: boolean;
  createdBy: number;
  publishedAt?: number;
  books: Book[];
  tags: Tag[];
}

export interface ReviewResponseDTO {
  reviewId: number;
  body: string;
  cover_images: string[];
  byline: string;
  featured: boolean;
  // @TODO: uncomment when christine changes are merged
  // created_by: number;
  books: Book[];
  tags: Tag[];
  updatedAt: number;
  publishedAt: number;
}

export interface IReviewService {
  /**
   * create an Entity with the fields given in the DTO, return created Entity
   * @param review fields
   * @returns the created Review
   * @throws Error if creation fails
   */

  createReview(entity: ReviewRequestDTO): Promise<ReviewResponseDTO>;
  getReview(id: string): Promise<ReviewResponseDTO>;
  getReviews(): Promise<ReviewResponseDTO[]>;
}
