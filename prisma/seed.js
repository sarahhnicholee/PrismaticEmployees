// const prisma = require("../prisma/");
// const seed = async () => {
//   const employees = [];
//   for (let i = 0; i < 10; i++) {
//     employees.push({ name: `Employee ${i}` });
//   }
//   await prisma.employee.createMany({ data: employees });
// };
// seed()
//   .then(async () => await prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

const prisma = require("../prisma/index");
const seed = async () => {
  // TODO: Create 10 books with placeholder titles
  const employees = [];
  for (let i = 0; i < 10; i++) {
    employees.push({ name: `Employee ${i}` });
  }
  await prisma.employee.createMany({ data: employees });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
