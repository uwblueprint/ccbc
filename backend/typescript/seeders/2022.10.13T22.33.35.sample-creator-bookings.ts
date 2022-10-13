import { Seeder } from "../umzug";

const seedBookings = [
  {
    id: 1,
    creatorId: 1,
    name: "Shrinjay",
    email: "shrinjaymukherjee@uwblueprint.org",
    date: new Date(1666626772806),
    isTentative: true,
    isOneDay: false,
    ageGroup: "9-12",
    audienceSize: 20,
    subject: "Talking about mental health",
    message:
      "Hello! My name is Shrinjay and I'm looking to book a talk with an author to speak to a group of 20 kids about mental health related to your book series.",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    creatorId: 1,
    name: "Sally",
    email: "sally@hotmail.com",
    date: new Date(1666629772806),
    isTentative: false,
    isOneDay: true,
    ageGroup: "4-8",
    audienceSize: 32,
    subject: "Talking about mysteries",
    message:
      "Hello! My name is Sally and I'm looking to book a talk with an author to speak to a group of 32 kids about mysteries related to your book series.",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE creator_bookings CASCADE");
  await sequelize
    .getQueryInterface()
    .bulkInsert("creator_bookings", seedBookings);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("creator_bookings", { id: seedBookings.map((u) => u.id) });
};
