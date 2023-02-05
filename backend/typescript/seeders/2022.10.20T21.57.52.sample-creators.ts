import { Seeder } from "../umzug";

const seedCreators = [
  {
    id: 1,
    user_id: 1,
    location: "Canada",
    rate: 4.6,
    genre: "Mystery",
    age_range: "[10, 30)",
    timezone: "EDT",
    bio: "A mysterious author who writes detective stories to unravel great conspiracies",
    isApproved: true,
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
    craft: "TODO",
    website: "https://example.com",
    profile_picture_link: "TODO", // get from firebase cloud storage,
    availability: "TODO",
    book_covers: ["TODO1", "TODO2"], // array of URLs
    isReadyForReview: true,
    presentations: [],
    publications: []
  },
  {
    id: 2,
    user_id: 1,
    location: "USA",
    rate: 2.3,
    genre: "Horror",
    age_range: "[15, 28)",
    timezone: "EDT",
    bio: "A proactive author using books to teach youngsters about the horrors in the real world like those found in abandoned ghost towns",
    isApproved: false,
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
    craft: "TODO",
    website: "https://google.com",
    profile_picture_link: "TODO", // get from firebase cloud storage,
    availability: "TODO",
    book_covers: ["TODO1", "TODO2"], // array of URLs
    isReadyForReview: true,
    presentations: [],
    publications: []
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
