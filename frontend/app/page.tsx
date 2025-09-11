import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4 text-balance">AI Songwriter & Poet</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Create beautiful songs and poems with the help of our chatbot. Choose your creative mode and start writing!
        </p>
      </div>

      <ChatInterface />
    </div>
  )
}
