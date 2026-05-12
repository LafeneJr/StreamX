import { Request, Response } from "express"
import { db } from "../db/index.js"
import { contents } from "../db/schema/content.schema.js"
import { eq } from "drizzle-orm"
import { getMovieDetails, getMoviesByGenre, getMovieVideos, getSimilarMovies } from "../services/tmdb.service.js"
import { getMovieNews } from "../services/news.service.js"

export const createContent = async (req: Request, res: Response) => {
    try {
        const { title, description, mediaUrl, planId } = req.body

        const newContent = await db.insert(contents).values({
            title, description, mediaUrl, planId,
        }).returning()

        res.status(201).json({
            success: true,
            data: newContent,
        })
        return;

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create content",
        })
        return;
    }
}

export const getAllContent = async (req: Request, res: Response) => {
    const allContent =await db.select().from(contents)

    res.json({
        success: true,
        data: allContent,
    })
    return;
}

export const getSingleContent = async (req: Request, res: Response) => {
    const id = req.params.id as string

    const singleContent = await db
      .select()
      .from(contents)
      .where(eq(contents.id, id))
    
      res.json({
        success: true,
        data: singleContent,
    })
    return;
      
}

export const getExternalMovies = async (req: Request, res: Response) => {
  try {
    const genre = req.query.genre as string | undefined

    const movies = await getMoviesByGenre(genre)

    res.json({
      success: true,
      data: movies,
    })
  } catch (err) {
    console.error("External movies error:", err)
    res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
    })
  }
}

export const updateContent = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const { title, description, mediaUrl, planId } = req.body

    await db
        .update(contents)
        .set({ title, description, mediaUrl, planId })
        .where(eq(contents.id, id))

    res.json({
        success: true,
        message: "Content updated successfully",
    })
}

export const deleteContent = async (req: Request, res: Response) => {
    const id = req.params.id as string

    await db.delete(contents).where(eq(contents.id, id))

    res.json({
        success: true,
        message: "Content deleted successfully",
    })

    
}

const getParam = (param: string | string[] | undefined): string => {
  if (!param) throw new Error("Missing parameter")
  return Array.isArray(param) ? param[0] : param
}

export const getMovieDetailsController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getParam(req.params.id)

    const data = await getMovieDetails(id)

    res.json({
      success: true,
      data,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch movie details",
    })
  }
}

export const getMovieFullDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const id = getParam(req.params.id)

    const details = await getMovieDetails(id)
    const videos = await getMovieVideos(id)
    const similar = await getSimilarMovies(id)

    res.json({
      success: true,
      data: {
        details,
        videos,
        similar,
      },
    })
  } catch (error: any) {
    console.error("MOVIE DETAILS ERROR:", error.message)

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch movie details",
    })
  }
}

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await getMovieNews()

    res.json({
      success: true,
      data: news,
    })
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    })
  }
}