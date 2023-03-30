import { Seeder } from "../umzug";

type CreatorSeed = {
  id: number;
  user_id: number;
  location: string;
  rate: number;
  genre: string[];
  age_range: string;
  timezone: string;
  bio: string;
  is_approved: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  craft: string[];
  website: string;
  profile_picture_link: string;
  availability: string[];
  book_covers: string[];
  isReadyForReview: boolean;
  presentations?: any;
  publications?: any;
  createdAt: Date;
  updatedAt: Date;
};

const seedCreators: CreatorSeed[] = [
  {
    id: 1,
    user_id: 1,
    location: "Canada",
    rate: 4.6,
    genre: ["Mystery"],
    age_range: "[10, 30)",
    timezone: "America/Winnipeg",
    bio: "A mysterious author who writes detective stories to unravel great conspiracies",
    is_approved: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    first_name: "John",
    last_name: "Smith",
    email: "john@gmail.com",
    phone: "523-431-0000",
    street_address: "80 Spadina Ave",
    city: "Toronto",
    province: "ON",
    postal_code: "M5V 2J4",
    craft: ["TODO"],
    website: "https://example.com",
    profile_picture_link: "TODO", // get from firebase cloud storage,
    availability: [
      "SundayMorning",
      "TuesdayAfternoon",
      "ThursdayMorning",
      "SaturdayMorning",
      "MondayAfternoon",
      "WednesdayAfternoon",
      "FridayAfternoon",
    ],
    book_covers: ["TODO1", "TODO2"], // array of URLs
    isReadyForReview: true,
  },
  {
    id: 2,
    user_id: 2,
    location: "USA",
    rate: 2.3,
    genre: ["Horror"],
    age_range: "[15, 28)",
    timezone: "America/Halifax",
    bio: "A proactive author using books to teach youngsters about the horrors in the real world like those found in abandoned ghost towns",
    is_approved: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    first_name: "Sarah",
    last_name: "Doe",
    email: "sarah@gmail.com",
    phone: "499-800-1234",
    street_address: "200 Ring Rd",
    city: "Waterloo",
    province: "ON",
    postal_code: "N2L 3G1",
    craft: ["TODO"],
    website: "https://google.com",
    profile_picture_link: "TODO", // get from firebase cloud storage,
    availability: [
      "SundayAfternoon",
      "TuesdayAfternoon",
      "ThursdayAfternoon",
      "SaturdayMorning",
      "MondayAfternoon",
      "WednesdayAfternoon",
      "FridayAfternoon",
    ],
    book_covers: ["TODO1", "TODO2"], // array of URLs
    isReadyForReview: true,
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE creator CASCADE");
  await sequelize.getQueryInterface().bulkInsert("creator", seedCreators);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("creator", { id: seedCreators.map((u) => u.id) });
};
