import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import OfflineIndicator from "../components/OfflineIndicator"

function BookViewer() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isPageOffline, setIsPageOffline] = useState(false)

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch("/books.json")
        const books = await response.json()
        const selectedBook = books.find((b) => b.id === id)
        setBook(selectedBook)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching book:", error)
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < (book?.pages.length - 1 || 0)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleImageError = () => {
    if (!navigator.onLine) {
      setIsPageOffline(true)
    }
  }

  useEffect(() => {
    setIsPageOffline(false)
  }, [currentPage])

  if (isLoading) {
    return <div className="container">Loading book...</div>
  }

  if (!book) {
    return <div className="container">Book not found.</div>
  }

  const totalPages = book.pages.length
  const currentPageData = book.pages[currentPage]

  return (
    <div className="viewer-container">
      <header className="viewer-header">
        <Link to="/" className="back-button">
          ← Home
        </Link>
        <div className="page-indicator">
          Halaman {currentPage + 1}/{totalPages}
        </div>
        <OfflineIndicator />
      </header>

      <main className="page-display">
        {isPageOffline ? (
          <div className="fallback-message">
            <h3>Halaman belum diunduh.</h3>
            <p>
              Silakan periksa koneksi internet Anda untuk melihat halaman ini.
            </p>
          </div>
        ) : (
          <img
            key={
              currentPageData.image
            } /* Add key to re-trigger component on change */
            src={currentPageData.image}
            alt={`Page ${currentPage + 1}`}
            className="page-image"
            onError={handleImageError}
          />
        )}
      </main>

      <footer className="viewer-controls">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Prev
        </button>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Next
        </button>
      </footer>
    </div>
  )
}

export default BookViewer
