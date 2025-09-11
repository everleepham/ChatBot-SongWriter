"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Music, FileText, Trash2, Search, Copy, Share2 } from "lucide-react"
import { useFavorites } from "@/components/favorites-context"
import { useToast } from "@/hooks/use-toast"

export function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const { toast } = useToast()

  // Filter favorites based on search query and selected tab
  const filteredFavorites = favorites.filter((favorite) => {
    const matchesSearch = favorite.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = selectedTab === "all" || favorite.type === selectedTab
    return matchesSearch && matchesTab
  })

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied to clipboard",
        description: "The content has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleShare = async (content: string, type: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My AI ${type === "songwriter" ? "Song" : "Poem"}`,
          text: content,
        })
      } catch (error) {
        // User cancelled sharing or error occurred
        handleCopy(content)
      }
    } else {
      // Fallback to copy
      handleCopy(content)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const songCount = favorites.filter((f) => f.type === "songwriter").length
  const poemCount = favorites.filter((f) => f.type === "poem").length

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <h1 className="text-4xl font-bold text-primary">Your Favorites</h1>
        </div>
        <p className="text-lg text-muted-foreground text-pretty">All your starred songs and poems in one place</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="font-semibold">Total Favorites</span>
          </div>
          <p className="text-2xl font-bold text-primary">{favorites.length}</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Music className="h-5 w-5 text-primary" />
            <span className="font-semibold">Songs</span>
          </div>
          <p className="text-2xl font-bold text-primary">{songCount}</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold">Poems</span>
          </div>
          <p className="text-2xl font-bold text-primary">{poemCount}</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({favorites.length})</TabsTrigger>
              <TabsTrigger value="songwriter">Songs ({songCount})</TabsTrigger>
              <TabsTrigger value="poem">Poems ({poemCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>

      {/* Favorites List */}
      {filteredFavorites.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="mb-4">
            {searchQuery ? (
              <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
            ) : (
              <Heart className="h-12 w-12 mx-auto text-muted-foreground/50" />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2">{searchQuery ? "No matches found" : "No favorites yet"}</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search terms or filters."
              : "Start chatting with the AI and star your favorite creations!"}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredFavorites.map((favorite) => (
            <Card key={favorite.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    {favorite.type === "songwriter" ? (
                      <Music className="h-4 w-4 text-primary" />
                    ) : (
                      <FileText className="h-4 w-4 text-primary" />
                    )}
                    <Badge variant="secondary">{favorite.type === "songwriter" ? "Song" : "Poem"}</Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(favorite.timestamp)}</span>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-foreground bg-transparent border-none p-0 m-0">
                      {favorite.content}
                    </pre>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(favorite.content)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(favorite.content, favorite.type)}
                    className="h-8 w-8 p-0"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFavorite(favorite.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
