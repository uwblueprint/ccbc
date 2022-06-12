import { Seeder } from "../umzug";

const seedBooks = [
  {
    id: 1,
    review_id: 1,
    cover_image:
      "https://dynamic.indigoimages.ca/v1/books/books/1989996035/1.jpg?width=614&maxheight=614&quality=85",
    title: "The Loudest Bark",
    illustrator: ["Amélie Ayotte"],
    // TODO: format and age range fields are left out until we can statically assign types to seed data
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    review_id: 2,
    cover_image: "https://images.penguinrandomhouse.com/cover/9781524773038",
    title: "Bloom",
    series_id: 1,
    series_order: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 3,
    review_id: 3,
    cover_image:
      "https://redeemedreader.com/wp-content/uploads/2021/06/Hatch-198x300.jpg",
    title: "Hatch",
    series_id: 1,
    series_order: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 4,
    review_id: 4,
    cover_image: "https://images2.penguinrandomhouse.com/cover/9780593339848",
    title: "Thrive",
    series_id: 1,
    series_order: 3,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 5,
    review_id: 5,
    cover_image:
      "https://media.harrypotterfanzone.com/philsophers-stone-uk-childrens-edition.jpg",
    title: "Philosopher's Stone",
    series_id: 2,
    series_order: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 6,
    review_id: 5,
    cover_image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474169725l/15881._SY475_.jpg",
    title: "Chamber of Secrets",
    series_id: 2,
    series_order: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 7,
    review_id: 5,
    cover_image:
      "https://upload.wikimedia.org/wikipedia/en/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg",
    title: "Prisoner of Azkaban",
    series_id: 2,
    series_order: 3,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 8,
    review_id: 5,
    cover_image:
      "https://upload.wikimedia.org/wikipedia/en/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png",
    title: "Goblet of Fire",
    series_id: 2,
    series_order: 4,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 9,
    review_id: 5,
    cover_image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg/220px-Harry_Potter_and_the_Order_of_the_Phoenix.jpg",
    title: "Order of the Pheonix",
    series_id: 2,
    series_order: 5,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 10,
    review_id: 5,
    cover_image:
      "https://upload.wikimedia.org/wikipedia/en/b/b5/Harry_Potter_and_the_Half-Blood_Prince_cover.png",
    title: "Half Blood Prince",
    series_id: 2,
    series_order: 6,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 11,
    review_id: 5,
    cover_image:
      "https://upload.wikimedia.org/wikipedia/en/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg",
    title: "Deathly Hallows",
    series_id: 2,
    series_order: 7,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 12,
    review_id: 6,
    cover_image: "https://ia903207.us.archive.org/BookReader/BookReaderPreview.php?id=kingdomoffantasy00gero&subPrefix=kingdomoffantasy00gero&itemPath=/21/items/kingdomoffantasy00gero&server=ia903207.us.archive.org&page=leaf1&fail=preview&&scale=8&rotate=0",
    title: 'Kingdom of Fantasy',
    series_id: 3,
    series_order: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 13,
    review_id: 6,
    cover_image: "https://bigcartoon.org/images/thumb/4/47/The_Phoenix_of_Destiny-Cover.png/180px-The_Phoenix_of_Destiny-Cover.png",
    title: 'Pheonix of Destiny',
    series_id: 3,
    series_order: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },


];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE books CASCADE");
  await sequelize.getQueryInterface().bulkInsert("books", seedBooks, {}, []);
  await sequelize.getQueryInterface().bulkUpdate(
    "books",
    {
      formats: [
        {
          format: "format1",
          price: "$15.0",
          isbn: "1234-5678-931",
        },
      ],
      age_range: "[3,18)",
    },
    {},
  );
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("books", { id: seedBooks.map((u) => u.id) });
};
