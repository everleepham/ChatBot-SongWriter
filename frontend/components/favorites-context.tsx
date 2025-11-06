"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface FavoriteMessage {
  id: string
  content: string
  type: "songwriter" | "poem"
  timestamp: number
}

interface FavoritesContextType {
  favorites: FavoriteMessage[]
  addFavorite: (message: Omit<FavoriteMessage, "id" | "timestamp">) => void
  removeFavorite: (id: string) => void
  isFavorite: (content: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMessage[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("ai-writer-favorites")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error)
      }
    }
  }, [])

  // Save favorites to localStorage on change
  useEffect(() => {
    localStorage.setItem("ai-writer-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (message: Omit<FavoriteMessage, "id" | "timestamp">) => {
    const newFavorite: FavoriteMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    }
    setFavorites((prev) => [newFavorite, ...prev])
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id))
  }

  const isFavorite = (content: string) => {
    return favorites.some((fav) => fav.content === content)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
