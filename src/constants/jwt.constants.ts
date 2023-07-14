export const jwtConstants = {
  secret: `${process.env.JWT_SECRET_KEY}`,
  validityTime: `${process.env.JWT_VALIDITY_TIME}`,
};
