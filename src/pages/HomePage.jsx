import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function HomePage() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    fetch("/books.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok")
        return response.json()
      })
      .then((data) => {
        if (isMounted) setBooks(data)
      })
      .catch((err) => {
        if (isMounted) setError(err.message)
        console.error("Error fetching books:", err)
      })
    return () => {
      isMounted = false
    }
  }, [])

  if (error) {
    return <div className="container">Error: {error}</div>
  }

  return (
    <div className="container">
      <h1>Pintara Flipbook Reader</h1>
      <div className="book-grid">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id} className="book-card">
            <img src={book.thumbnail} alt={book.title} />
            <h2>{book.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
