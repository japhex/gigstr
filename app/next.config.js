/** @type {import('next').NextConfig} */

module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['gigstr.s3.amazonaws.com', 'i.scdn.co'],
    minimumCacheTTL: 60,
  },
}
