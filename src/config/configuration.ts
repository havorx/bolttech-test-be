// function getEnv(key: string) {
//   if (process.env[key] === undefined) {
//     throw Error(`Missing configuration variable with key ${key}`);
//   }
//
//   if (typeof process.env[key] === 'number') {
//     return parseInt(process.env[key]);
//   }
//
//   return process.env[key];
// }

export default () => ({
  database: {
    mongoDb: {
      connectionString: process.env['MONGODB_CONNECTION_STRING'],
    },
  },
});
