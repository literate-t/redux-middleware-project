const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

/**
 * @typedef Post
 * @property {number} id
 * @property {string} title
 * @property {string} body
 */

/** @type {Post[]} */
const posts = [
  {
    id: 1,
    title: 'getting a job',
    body: 'practice practice practice',
  },
  {
    id: 2,
    title: 'optimizing',
    body: 'lazy loading?',
  },
  {
    id: 3,
    title: 'login',
    body: 'using token',
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  return (await getPosts()).find((post) => id === post.id);
};
