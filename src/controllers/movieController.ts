import Movie from "../schemas/movieSchema";
// import genreModel from "../schemas/genresSchema";
import genres from "../schemas/genresSchema";
import { Request, Response } from "express";

export const findMovie = async (req: Request, res: Response) => {
  //   const movies = await Movie.find().sort("name");
  const movies = await Movie.find();
  res.send(movies);
};

export const createMovie = async (req: Request, res: Response) => {
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const genre = await genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
};

export const updateMovie = async (req: Request, res: Response) => {
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const genre = await genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
};

export const deleteMovie = async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  await movie.deleteOne();
  res.send({ data: true });
};

export const findOneMovie = async (req:Request, res:Response) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
};