import axios from "axios"

export const getMoviesByGenre = async (genre?: string) => {
  try {
    const url = genre
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`

    const res = await axios.get(url)

    return res.data.results
  } catch (err: any) {
    console.error("TMDB ERROR:", err.message)
    throw err
  }
}



const BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = process.env.TMDB_API_KEY

export const getPopularMovies = async () => {
  const res = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  )

  return res.data.results
}

export const getMovieDetails = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  )

  return res.data
}

export const getMovieVideos = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  )

  return res.data.results
}

export const getSimilarMovies = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
  )

  return res.data.results
}