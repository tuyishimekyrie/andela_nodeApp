import { Response, Request } from "express";
import { customerDtos } from "../dtos/customer";
import Customer from "../schemas/customersSchema";

export const findCustomers = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
export const createCustomer = async (req: Request, res: Response) => {
  //   const { error } = req.body as customerDtos;
  //   if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer);
};

export const updateCustomer = async (req: Request, res: Response) => {
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

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
  res.send({data:true});
};

export const findOneCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
};
