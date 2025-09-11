import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Music, FileText, Lightbulb, Target, Palette, Heart, MessageCircle, Star, Zap } from "lucide-react"
import Link from "next/link"

export function GuidePage() {
  const songwritingTips = [
    {
      title: "Start with Emotion",
      description: "Tell the AI about the feeling or story you want to convey. Emotions are the heart of great songs.",
      example: "Write a melancholic song about missing a childhood friend",
    },
    {
      title: "Specify the Genre",
      description: "Mention the musical style to get lyrics that fit the vibe you're going for.",
      example: "Create a country ballad about small-town life",
    },
    {
      title: "Include Structure Hints",
      description: "Ask for specific song parts like verses, chorus, or bridge to get a complete song.",
      example: "Write a pop song with 2 verses, a catchy chorus, and a bridge",
    },
    {
      title: "Use Imagery",
      description: "Describe scenes, colors, or sensory details to inspire more vivid lyrics.",
      example: "A song about driving at sunset with golden light and empty highways",
    },
  ]

  const poetryTips = [
    {
      title: "Choose Your Theme",
      description: "Give the AI a clear subject or emotion to explore in your poem.",
      example: "Write a poem about the changing seasons and growing older",
    },
    {
      title: "Specify the Style",
      description: "Mention if you want a specific poetic form like haiku, sonnet, or free verse.",
      example: "Create a haiku about morning coffee",
    },
    {
      title: "Use Metaphors",
      description: "Ask for poems that compare your subject to something unexpected.",
      example: "A poem comparing heartbreak to a wilting garden",
    },
    {
      title: "Set the Mood",
      description: "Describe the atmosphere you want - peaceful, intense, mysterious, joyful.",
      example: "Write a peaceful poem about rain on a quiet afternoon",
    },
  ]

  const features = [
    {
      icon: MessageCircle,
      title: "Smart Chat Interface",
      description: "Switch between songwriter and poet modes to get specialized creative assistance.",
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
          Learn how to get the best results from your AI writing assistant. Master the art of prompting for songs and
          poetry.
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
              Describe the emotion, story, or theme. Mention genre if you have one in mind.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              For Poetry
            </h3>
            <p className="text-sm text-muted-foreground">
              Share your inspiration, mood, or subject. Specify style if desired.
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
        <div className="grid md:grid-cols-2 gap-4">
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
                    <p className="text-sm italic">"{tip.example}"</p>
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
                    <p className="text-sm italic">"{tip.example}"</p>
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
              <li>• Be specific about emotions and themes</li>
              <li>• Mention genre or style preferences</li>
              <li>• Use descriptive language and imagery</li>
              <li>• Ask for specific song/poem structures</li>
              <li>• Star your favorite creations</li>
              <li>• Experiment with different prompts</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-600 mb-3">✗ Avoid This</h3>
            <ul className="space-y-2 text-sm">
              <li>• Vague requests like "write a song"</li>
              <li>• Asking for copyrighted material</li>
              <li>• Expecting perfect results on first try</li>
              <li>• Forgetting to save favorites</li>
              <li>• Not experimenting with different modes</li>
              <li>• Giving up after one attempt</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Backend Setup Info */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Zap className="h-5 w-5" />
          Backend Configuration
        </h2>
        <div className="space-y-3 text-sm">
          <p>
            This frontend connects to your Python backend with Google AI integration. Make sure your backend is running
            and accessible.
          </p>
          <div className="bg-white dark:bg-gray-900 p-3 rounded-md border">
            <p className="font-medium mb-2">Expected Backend Endpoints:</p>
            <ul className="space-y-1 text-xs font-mono">
              <li>
                • <code>POST /songwriter</code> - For song generation
              </li>
              <li>
                • <code>POST /poem</code> - For poetry generation
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground">
            Set your backend URL in the environment variable <code>NEXT_PUBLIC_BACKEND_URL</code>
            or it will default to <code>http://localhost:8000</code>
          </p>
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
