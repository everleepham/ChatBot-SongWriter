# Overview Report

## AI Songwriter & Poet
---


### C. Realization & Technologies

#### 1. Backend

- **Framework**: FastAPI (Python) – lightweight and fast API framework, easy to connect with AI models.  
- **Endpoints**:
  - `POST /songwriter` → receives theme, style, and mood; returns AI-generated song lyrics.  
  - `POST /poemwriter` → receives theme and style; returns AI-generated poem.  
  - `GET /health` → simple health check.
- **AI Client**: Gemini SDK (`genai.Client`) – handles communication with the generative AI, sends user input, and receives content.  
- **Features**:
  - Input validation to ensure empty fields are rejected.  
  - Error handling to send user-friendly messages if AI API fails.  

#### 2. Frontend

- **Framework**: Next.js + React 
- **UI Library**: shadcn/ui + TailwindCSS
- **Pages**:
  - `/` → main chat interface for both songwriter and poet modes; handles user input, displays AI responses, and allows favoriting.  
  - `/guide` → detailed tips and best practices for writing songs and poems.  
  - `/favorites` → lists locally saved favorites; stored in browser `localStorage`.  
- **Features**:
  - Mode selection (songwriter or poet) with dynamic UI updates.  
  - Loading indicators when waiting for AI response.  
  - Local storage for favorites without requiring user accounts.  
  - Responsive design  

---

### D. Generative AI Integration

#### 1. AI Setup

- **Model**: `gemini-2.5-flash` – lightweight generative AI optimized for text content.  
- **Function Used**: `client.models.generate_content` – sends a short prompt and receives generated text.  
- **Input Format**: theme, style, and mood combined into a short, structured prompt to guide the AI.  
  - Example: `"Theme: lost love; Style: ballad; Mood: nostalgic"`  

#### 2. Configuration

- **Songwriter Mode**:
  - `thinking_budget = 2` → allows more time for AI to generate detailed lyrics.  
- **Poemwriter Mode**:
  - `thinking_budget = 1` → quicker response, shorter text expected.  
- **Other Settings**:
  - Max tokens and response length controlled to balance quality and cost.  
  - System prompt sets context for AI (song or poem) to ensure output matches mode.

#### 3. Performance Tuning

- Optimized prompt format to get clearer and more relevant responses.  
- Reduced token usage to lower cost without sacrificing output quality.  
- Tested different `thinking_budget` values to find the best balance between speed and creativity.  
- Implemented retry logic in case of network or API errors.  
- Logged response times and content quality for later analysis and improvements.

--- 
### E. Data Privacy Concerns

#### Potential Issues
- **User Input Exposure**: All inputs (Mood/Theme/Style) are sent to the AI API. If users enter personal or sensitive information, it could be processed and temporarily stored externally by the AI provider.
- **Local Storage Visibility**: Favorites saved in `localStorage` are accessible to anyone with access to the device/browser. 
- **Indirect Tracking Risks**: If API requests include identifiable information (like username or IP), AI providers may log usage patterns.

#### Solutions & Mitigations
- Only request **keywords** (theme, mood, style) instead of full sentences describing personal stories.
- Do not save any user-generated data on your own servers.
- All favorites are strictly stored in `localStorage`; consider encryption for extra security.
-  Display clear messages reminding users not to input private information.
-  Strip metadata or identifiable details from requests before sending to AI APIs.

#### Best Practices
- Implement a **privacy notice** explaining what data is sent to the AI and how it is handled.
- Limit API logging of user content wherever possible.
- Regularly review dependencies for any potential privacy leaks.

---

### F. Security Concerns

#### Authentication
- **Current status**: No authentication implemented (because this is just a demo).
- **Recommended Production Setup**:
  - OAuth2 or JWT-based login
  - Password hashing and secure storage for any credentials.
  - Optional multi-factor authentication

#### Role Management
- Potential roles:
  - **Basic Users**: Can generate content and view favorites.
  - **Premium Users**: Access to advanced AI settings or higher usage limits.
  - **Admin**: Manage platform usage, monitor logs, and enforce security policies.
- Always check roles on the server to avoid abuse.

#### Threats & Countermeasures
- **Bad Inputs / Prompt Injection**: Users might try to send harmful commands. Solution: only accept keywords, sanitize input.
- **API Abuse**: Excessive or automated requests could overload the AI backend. Mitigation: implement rate limiting, CAPTCHA for heavy usage, and monitoring logs.
- **XSS Vulnerabilities**: Rendering user content (e.g., favorites from `localStorage`) could be exploited. Mitigation: escape HTML and scripts before rendering on the frontend.
- **Man-in-the-Middle Attacks**: All API calls should use HTTPS to prevent interception of user input.
- **Dependency Vulnerabilities**: Regularly audit third-party libraries (e.g., Gemini SDK, Next.js, Tailwind) for security updates.


#### Best Practices
- Always validate and sanitize user input both client-side and server-side.
- Apply the principle of least privilege for all users and APIs.
- Monitor unusual activity and maintain logs for potential security incidents.


