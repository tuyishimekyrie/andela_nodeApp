import { Response, Request } from "express"; 
import {genreDtos} from "../dtos/genre";
import genres from "../schemas/genresSchema";


export const findGenres = async (req: Request, res: Response) => {
  try {
    const genre = await genres.find();
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body as genreDtos;
  try {
    const createdGenre = await saveGenreToDatabase(name);
    res.status(201).json(createdGenre);
  } catch (error) {
    console.error("Error creating genre:");
    res.status(500).send("Internal Server Error");
  }
};

const saveGenreToDatabase = async (name: string) => {
  try {
    const genre = new genres({ name });
    const savedGenre = await genre.save();
    return savedGenre;
  } catch (error:any) {
    throw new Error(
      `Error saving genre to the database:`
    );
  }
};
export const updateGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body as genreDtos;

  try {
    // Find the genre by ID
    const foundGenre = await genres.findById(id);

    if (!foundGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    // Update the genre with the new name
    foundGenre.name = name;

    // Save the updated genre
    const updatedGenre = await foundGenre.save();

    res.status(200).json(updatedGenre);
  } catch (error) {
    console.error("Error updating genre:");
    res.status(500).send("Internal Server Error");
  }
};


export const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find the genre by ID
    const foundGenre = await genres.findById(id);
    // const foundGenres = await genres.findByIdAndDelete();

    if (!foundGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    // Remove the genre from the database
      await foundGenre.deleteOne();

    res.status(200).json({ data: true });
  } catch (error) {
    console.error("Error deleting genre:");
    res.status(500).send("Internal Server Error");
  }
};