/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/snippets',
        permanent: true,
      },
    ];
  },
};
