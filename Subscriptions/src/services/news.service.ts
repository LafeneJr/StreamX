import axios from "axios"

export const getMovieNews = async () => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=movies&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    )

    return res.data.articles.slice(0, 6)
  } catch (err: any) {
    console.error("NEWS ERROR:", err.message)
    throw err
  }
}