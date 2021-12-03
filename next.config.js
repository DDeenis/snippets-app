/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')();

module.exports = removeImports({
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
  experimental: {esmExternals: true},
});
