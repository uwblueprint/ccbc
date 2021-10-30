interface Author {
  fullName: string;
  displayName: string | null;
  attribution: string | null;
}

interface Publisher {
  fullName: string;
  publishDate: Date;
}

interface Book {
  title: string;
  seriesOrder: string | null;
  illustrator: string[];
  translator: string[];
  formats: string[];
  minAge: number | null;
  maxAge: number | null;
  authors: Author[];
  publishers: Publisher[];
  seriesName: string;
}

interface Tag {
  name: string;
}

export interface ReviewRequestDTO {
  body: string;
  coverImages: string[];
  byline: string;
  featured: boolean;
  createdBy: number;
  publishedAt: Date | null;
  books: Book[];
  tags: Tag[];
}

export interface ReviewResponseDTO {
  reviewId: number;
  body: string;
  cover_images: string[];
  byline: string;
  featured: boolean;
  created_by: number;
  published_at: Date | null;
  books: Book[];
  tags: Tag[];
  createdAt: Date;
  publishedAt: Date;
}

export interface IReviewService {
  /**
   * create an Entity with the fields given in the DTO, return created Entity
   * @param review fields
   * @returns the created Review
   * @throws Error if creation fails
   */

  createEntity(entity: ReviewRequestDTO): Promise<ReviewResponseDTO>;
}
