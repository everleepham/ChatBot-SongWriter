"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Music, FileText, Star, StarOff, Loader2 } from "lucide-react"
import { useFavorites } from "@/components/favorites-context"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  type?: "songwriter" | "poem"
  timestamp: number
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMode, setSelectedMode] = useState<"songwriter" | "poem">("songwriter")
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  // You'll need to replace these URLs with your actual backend endpoints
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input.trim(),
      role: "user",
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Determine endpoint based on selected mode
      const endpoint = selectedMode === "songwriter" ? "/songwriter" : "/poem"

      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          // Add any additional parameters your backend expects
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: data.response || data.message || "No response received",
        role: "assistant",
        type: selectedMode,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Sorry, I encountered an error. Please make sure your backend is running and try again.",
        role: "assistant",
        type: selectedMode,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleFavorite = (message: Message) => {
    if (message.role === "assistant" && message.type) {
      if (isFavorite(message.content)) {
        // Find and remove the favorite
        // Note: This is a simplified approach. In a real app, you might want to store message IDs
        removeFavorite(message.content)
      } else {
        addFavorite({
          content: message.content,
          type: message.type,
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card className="p-4">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium">Choose your creative mode:</span>
          <div className="flex gap-2">
            <Button
              variant={selectedMode === "songwriter" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMode("songwriter")}
              className="flex items-center gap-2"
            >
              <Music className="h-4 w-4" />
              Songwriter
            </Button>
            <Button
              variant={selectedMode === "poem" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMode("poem")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Poem Writer
            </Button>
          </div>
        </div>
      </Card>

      {/* Chat Messages */}
      <Card className="h-[500px] flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            {selectedMode === "songwriter" ? (
              <Music className="h-5 w-5 text-primary" />
            ) : (
              <FileText className="h-5 w-5 text-primary" />
            )}
            <h2 className="font-semibold">{selectedMode === "songwriter" ? "AI Songwriter" : "AI Poet"}</h2>
            <Badge variant="secondary" className="ml-auto">
              {selectedMode === "songwriter" ? "Song Mode" : "Poetry Mode"}
            </Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <div className="mb-4">
                {selectedMode === "songwriter" ? (
                  <Music className="h-12 w-12 mx-auto text-muted-foreground/50" />
                ) : (
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
                )}
              </div>
              <p className="text-lg font-medium mb-2">
                {selectedMode === "songwriter"
                  ? "Ready to write your next hit song?"
                  : "Ready to craft beautiful poetry?"}
              </p>
              <p className="text-sm">
                {selectedMode === "songwriter"
                  ? "Tell me about the theme, mood, or story you want in your song."
                  : "Share your thoughts, emotions, or themes for your poem."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>

                    {message.role === "assistant" && message.type && (
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                        <Badge variant="outline" size="sm">
                          {message.type === "songwriter" ? "Song" : "Poem"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(message)}
                          className="h-6 w-6 p-0"
                        >
                          {isFavorite(message.content) ? (
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                          ) : (
                            <StarOff className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      {selectedMode === "songwriter" ? "Writing your song..." : "Crafting your poem..."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                selectedMode === "songwriter"
                  ? 'Describe your song idea... (e.g., "A love ballad about missing someone")'
                  : 'Share your poetry inspiration... (e.g., "A poem about autumn leaves")'
              }
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="lg" className="px-4">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </Card>
    </div>
  )
}
