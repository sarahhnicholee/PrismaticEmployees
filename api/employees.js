const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", (req, res, next) => {
  return res.json({ message: "Welcome to the Prismatic Employees API!" });
});

router.get("/employees", async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (e) {
    next(e);
  }
});

router.get("/employees/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // `id` has to be converted into a number before looking for it!
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (employee) {
      res.json(employee);
    } else {
      next({ status: 404, message: `Employee with id ${id} does not exist.` });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/employees/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  // Check if name was provided
  if (!name) {
    return next({
      status: 400,
      message: "A new name must be provided.",
    });
  }

  try {
    // Check if the employee exists
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({
        status: 404,
        message: `Employee with id ${id} does not exist.`,
      });
    }

    // Update the employee
    const updatedEmployee = await prisma.employee.update({
      where: { id: +id },
      data: { name },
    });
    res.json(updatedEmployee);
  } catch (e) {
    next(e);
  }
});

// router.put("employees/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const { name } = req.body;
//     const result = await prisma.user.update({
//       where: {
//         id,
//       },
//       data: {
//         name,
//       },
//     });
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       res.status(200).json("User not found");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.post("/employees", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({
      status: 400,
      message: "Name must be provided for a new employee.",
    });
  }
  try {
    const employee = await prisma.employee.create({ data: { name } });
    res.status(201).json(name);
  } catch (e) {
    next(e);
  }
});

// router.delete("employees/:id", async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     // Check if the employee exists
//     const employee = await prisma.employee.findUnique({ where: { id: +id } });
//     if (!employee) {
//       return next({
//         status: 404,
//         message: `Employee with id ${id} does not exist.`,
//       });
//     }

//     // Delete the employee
//     await prisma.employee.delete({ where: { id: +id } });
//     res.sendStatus(204);
//   } catch (e) {
//     next(e);
//   }
// });
router.delete("/employees/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the employee exists
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({
        status: 404,
        message: `Employee with id ${id} does not exist.`,
      });
    }

    // Delete the employee
    await prisma.employee.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
