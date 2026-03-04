export const config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  germanAverageSunHours: 1700,
  lastYear: new Date().getFullYear() - 1,
};
