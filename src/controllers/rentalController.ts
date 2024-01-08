import Rental from "../schemas/rentalSchema";
import { Request, Response } from "express";
import { Customer } from "../schemas/customersSchema";
import Movie from "../schemas/movieSchema";
import mongoose from "mongoose";

export const findRental = async (req: Request, res: Response) => {
  const rental = await Rental.find();
  res.send(rental);
};

export const createRental = async (req: Request, res: Response) => {
  // ...existing code for validation...

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const customer = await Customer.findById(req.body.customerId).session(
      session
    );
    if (!customer) return res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId).session(session);
    if (!movie) return res.status(400).send("Invalid movie.");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock.");

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    await rental.save({ session });
    movie.numberInStock--;
    await movie.save({ session });

    await session.commitTransaction();

    res.send(rental);
  } catch (ex) {
    await session.abortTransaction();
    console.error("Error during rental creation:", ex);
    res.status(500).send("Something failed.");
  } finally {
    session.endSession();
  }
};

export const findOneRental =  async (req:Request, res:Response) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
};