module.exports = {
  port: process.env.PORT || '3000',
  host: process.env.HOST || '0.0.0.0',
  secret: "CRYPTO-SECRET-KEY",
  cryptoMethod: 'sha512',
  expireTimeLong: 3.6e+6,
  expireTimeShort: 20000,
};
