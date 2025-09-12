import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Music, FileText, Lightbulb, Target, Palette, Heart, MessageCircle, Star, Zap } from "lucide-react"
import Link from "next/link"

export function GuidePage() {
  const songwritingTips = [
    {
      title: "Pick a Theme",
      description: "The main subject of your song. Think of what story or idea you want to express.",
      example: "Theme: lost love",
    },
    {
      title: "Choose a Style",
      description: "The musical genre or format. This defines the vibe and rhythm.",
      example: "Style: ballad",
    },
    {
      title: "Set the Mood",
      description: "The emotional tone of your song. It guides how the lyrics feel.",
      example: "Mood: nostalgic",
    },
  ]

  const poetryTips = [
    {
      title: "Pick a Theme",
      description: "What is your poem about? It can be emotions, nature, or abstract ideas.",
      example: "Theme: changing seasons",
    },
    {
      title: "Choose a Style",
      description: "The poetic form or writing style.",
      example: "Style: haiku",
    },
  ]

  const features = [
    {
      icon: MessageCircle,
      title: "Simple Input",
      description: "Just fill in Theme, Style, and Mood for songs — or Theme and Style for poems.",
    },
    {
      icon: Star,
      title: "Favorite System",
      description: "Star your best creations and access them anytime in your favorites collection.",
    },
    {
      icon: Heart,
      title: "Local Storage",
      description: "Your favorites are saved locally on your device - no account needed!",
    },
    {
      icon: Zap,
      title: "Real-time Generation",
      description: "Get instant creative responses powered by advanced AI technology.",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-primary">Creative Writing Guide</h1>
        </div>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Learn how to get the best results from your AI writing assistant. Just provide simple keywords for theme,
          style, and mood.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Quick Start</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <Music className="h-4 w-4" />
              For Songwriting
            </h3>
            <p className="text-sm text-muted-foreground">
              Fill in <strong>Theme + Style + Mood</strong>. Example: Theme = "childhood friend", Style = "pop", Mood =
              "melancholic".
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              For Poetry
            </h3>
            <p className="text-sm text-muted-foreground">
              Fill in <strong>Theme + Style</strong>. Example: Theme = "rain in autumn", Style = "haiku".
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button asChild>
            <Link href="/">Start Writing</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/favorites">View Favorites</Link>
          </Button>
        </div>
      </Card>

      {/* Features Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          App Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-4 text-center">
                <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Songwriting Tips */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Music className="h-6 w-6 text-primary" />
          Songwriting Tips
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {songwritingTips.map((tip, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                  <div className="bg-muted p-3 rounded-md">
                    <Badge variant="outline" className="mb-2">
                      Example
                    </Badge>
                    <p className="text-sm italic">{tip.example}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Poetry Tips */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Poetry Writing Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {poetryTips.map((tip, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 rounded-full p-2 mt-1">
                  <Palette className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                  <div className="bg-muted p-3 rounded-md">
                    <Badge variant="outline" className="mb-2">
                      Example
                    </Badge>
                    <p className="text-sm italic">{tip.example}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-green-600 mb-3">✓ Do This</h3>
            <ul className="space-y-2 text-sm">
              <li>• Use clear keywords for theme, style, and mood</li>
              <li>• Be specific instead of vague</li>
              <li>• Experiment with different moods or styles</li>
              <li>• Save your favorite creations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-600 mb-3">✗ Avoid This</h3>
            <ul className="space-y-2 text-sm">
              <li>• Leaving inputs empty</li>
              <li>• Using overly generic words like "something nice"</li>
              <li>• Expecting perfect results every time</li>
              <li>• Forgetting to try multiple combinations</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Create?</h2>
        <p className="text-muted-foreground mb-6">Start your creative journey with AI-powered songwriting and poetry</p>
        <Button size="lg" asChild>
          <Link href="/">Start Writing Now</Link>
        </Button>
      </div>
    </div>
  )
}