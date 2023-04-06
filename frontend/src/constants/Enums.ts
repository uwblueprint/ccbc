/* eslint-disable import/prefer-default-export */

export enum UserRole {
  Admin = "Admin",
  Subscriber = "Subscriber",
  Creator = "Author",
}

export enum TagType {
  Genre = "Genre",
  Age = "Age",
  Province = "Province",
  Craft = "Craft",
}

export enum Genre {
  /* Fiction */
  Fantasy = "Fantasy",
  SciFi = "Science Fiction",
  Dystopian = "Dystopian",
  Adventure = "Adventure",
  Romance = "Romance",
  Mystery = "Mystery",
  Horror = "Horror",
  Thriller = "Thriller",
  LGBTQPlus = "LGBTQ+",
  HistoricalFiction = "Historical Fiction",

  /* Non-fiction */
  AutoBiography = "Autobiography",
  Biography = "Biography",
  Cooking = "Cooking",
  Art = "Art",
  SelfHelp = "Self-Help",
  Health = "Health",
  History = "History",
  Crafts = "Crafts",
  Politics = "Politics",
  Religion = "Religion",
  Travel = "Travel",
}

export enum BookFormats {
  Hardcover = "Hardcover",
  Paperback = "Paperback",
  eBook = "eBook",
  audioBook = "Audio Book",
  Board = "Board Book",
}
