import { Response, Request } from "express";
import { customerDtos } from "../dtos/customer";
import { Customer } from "../schemas/customersSchema";
import { body, validationResult } from "express-validator";

export const validateCreateCustomer = [
  body("name").isString().isLength({ min: 3, max: 50 }),
  body("isGold").optional().isBoolean(),
  body("phone").optional().isString().isLength({ min: 5, max: 50 }),
];

export const findCustomers = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.find().sort("name");
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
export const createCustomer = async (req: Request, res: Response) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error: any) => `${error.param} is required`);
    return res.status(400).json({ errors: errorMessages });
  }

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  try {
    customer = await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    // Handle database-related errors here
    const errorsRunning = { error };
    console.error("Error saving customer:", { error });
    res.status(500).send(errorsRunning);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error: any) => `${error.param} is required`);
    return res.status(400).json({ errors: errorMessages });
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  await customer.deleteOne();
  res.send({ data: true });
};

export const findOneCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
};

