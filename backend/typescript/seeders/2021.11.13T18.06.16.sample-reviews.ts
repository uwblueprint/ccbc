import { Seeder } from "../umzug";

const seedReviews = [
  {
    id: 1,
    body:
      "In Schwartz and Gagnon's whimsical picture book, young Samuel lives a quiet life with their parents and a goldfish, Bubble, but they long for adventure. Samuel's quiet home life stands in stark contrast to the kooky sounds that burst out of their babysitter Chloe's home, where there is funky music, dog barks, and enough funny noises to make your head spin. Chloe works as a costume designer, and young readers will be delighted by the variety of outfits, including Victorian gowns and yellow bird suits, seen amongst her rows of costumes. After Chloe shows Samuel a new dazzling dress that she had been working on, Samuel reveals to Chloe that their real name is Simone, but they haven't figured out how to tell their parents yet. This delightful story encourages children to defy traditional gender norms and explore their identity and serves as a wonderful resource for parents and teachers who want to start a conversation with young children about gender identity. Chloe's unwavering support and acceptance of Simone's identity is heartwarming, and one will end the text wishing that they could dance around Chloe's house to music with her and Simone. Readers will also surely be delighted by Chloe's furry companion, aptly named Piano for her black and white spots, who delivers a set of four puppies that Simone names Hamlet, Zeus, Neptune, and Little Miss. Despite their pleading, Simone's parents at first refuse to adopt any of the boisterous new puppies, but after a considerate consultation with Chloe, Simone's parents provide their",
    cover_images: ["thumbnail1.com", "thumnail2.com"],
    byline:
      "Kayla O'Brien is working towards her Master's in English Literature at Queen's University.",
    featured: true,
    published_at: new Date(1636226732806),
    createdAt: new Date(1636226732806),
    updatedAt: new Date(1636226732806),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("reviews", seedReviews);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("reviews", { id: seedReviews.map((u) => u.id) });
};
