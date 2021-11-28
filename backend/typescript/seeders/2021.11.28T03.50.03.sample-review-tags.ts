import { Seeder } from "../umzug";

const seedReviewTags = [
  {
    review_id: 1,
    tag_id: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    review_id: 1,
    tag_id: 4,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    review_id: 2,
    tag_id: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    review_id: 2,
    tag_id: 3,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    review_id: 3,
    tag_id: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    review_id: 3,
    tag_id: 3,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("review_tag", seedReviewTags);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("review_tag", { tag_id: seedReviewTags.map((u) => u.tag_id) });
};
