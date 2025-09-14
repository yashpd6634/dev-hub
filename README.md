# 🚀 Dev Hub

A comprehensive developer community platform that combines Discord-like communication features with live streaming capabilities, collaborative whiteboards, and real-time interactions. Built with modern web technologies to provide a seamless experience for developers to connect, collaborate, and share knowledge.

## ✨ Features

### 🎯 Core Features

- **Real-time Messaging** - Instant messaging with text, file uploads, and emoji support
- **Server Management** - Create and manage Discord-like servers with channels
- **Live Streaming** - Integrated live streaming with LiveKit for broadcasting and watching streams
- **Collaborative Whiteboards** - Real-time collaborative drawing and brainstorming with Liveblocks
- **User Authentication** - Secure authentication with NextAuth.js supporting Google, GitHub, and email/password
- **Follow System** - Follow other developers and build your network
- **Block System** - Moderation tools to block unwanted users

### 🎨 User Experience

- **Dark Theme** - Modern dark theme design optimized for developers
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Real-time Updates** - Live updates for messages, user status, and collaborative features
- **File Uploads** - Support for uploading and sharing files using UploadThing
- **Search Functionality** - Find users, servers, and content efficiently

### 🛡️ Security & Moderation

- **Role-based Access Control** - Admin, Moderator, and Guest roles for servers
- **User Blocking** - Block system to prevent unwanted interactions
- **Email Verification** - Secure email verification for account registration
- **Password Reset** - Secure password reset functionality

## Screenshots

### Public Pages
<img width="1920" height="439" alt="image" src="https://github.com/user-attachments/assets/ecb11874-c469-407c-9bea-b792b15fb60d" />
<img width="1920" height="1035" alt="image" src="https://github.com/user-attachments/assets/9a24743f-55c6-44f0-9c78-659b494b4b8e" />

## Login Page
<img width="1920" height="1014" alt="image" src="https://github.com/user-attachments/assets/0a5b4fb0-8221-47b8-a652-ab66e03f749a" />


## 🛠️ Tech Stack

### Frontend

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation

### Backend & Database

- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[MySQL](https://www.mysql.com/)** - Relational database
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication library
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password hashing
- **[NestJS](https://nestjs.com/)** - Backend server for real-time socket communication

### Real-time Features

- **[Socket.IO](https://socket.io/)** - Real-time bidirectional communication via NestJS backend
- **[LiveKit](https://livekit.io/)** - Live video and audio streaming
- **[Liveblocks](https://liveblocks.io/)** - Real-time collaborative features
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching

### Additional Services

- **[UploadThing](https://uploadthing.com/)** - File upload service
- **[Resend](https://resend.com/)** - Email service for notifications
- **[Zod](https://zod.dev/)** - Schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- MySQL database
- NestJS backend server (for real-time socket communication)
- Environment variables (see Environment Setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yashpd6634/dev-hub.git
   cd dev-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="mysql://username:password@localhost:3306/devhub"

   # NextAuth.js
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"

   # LiveKit
   LIVEKIT_API_KEY="your-livekit-api-key"
   LIVEKIT_API_SECRET="your-livekit-api-secret"
   LIVEKIT_WS_URL="wss://your-livekit-url"

   # Liveblocks
   LIVEBLOCKS_SECRET_KEY="your-liveblocks-secret"

   # UploadThing
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"

   # Email Service
   RESEND_API_KEY="your-resend-api-key"

   # NestJS Backend for Real-time Socket Communication
   NEXT_PUBLIC_NEST_APP_URL="http://localhost:5000"
   NEXT_PUBLIC_NEST_APP_SOCKET_NAMESPACE="chats"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the NestJS backend server**
   Make sure your NestJS backend server is running on port 5000 for real-time socket communication.

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
dev-hub/
├── actions/              # Server actions for data mutations
├── app/                  # Next.js App Router pages
│   ├── (auth)/          # Authentication pages
│   ├── (browse)/        # Public browsing pages
│   ├── (dashboard)/     # User dashboard
│   ├── (invite)/        # Server invitation pages
│   └── api/             # API routes
├── components/          # Reusable React components
│   ├── auth/           # Authentication components
│   ├── providers/      # Context providers
│   ├── server/         # Server-related components
│   ├── stream-player/  # Streaming components
│   └── ui/             # UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and services
├── prisma/              # Database schema and migrations
├── schemas/             # Zod validation schemas
├── store/               # Zustand state management
└── types/               # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma db push` - Push schema changes to database

## 🌟 Key Features in Detail

### Authentication System

- **Multiple Providers**: Google, GitHub, and email/password authentication
- **Secure Registration**: Email verification and password hashing
- **Session Management**: Secure session handling with NextAuth.js

### Server & Channel System

- **Server Creation**: Users can create and manage their own servers
- **Channel Types**: Support for text, audio, video, and board channels
- **Role Management**: Admin, Moderator, and Guest roles with different permissions
- **Invite System**: Shareable invite codes for joining servers

### Live Streaming

- **Stream Management**: Create and manage live streams
- **Real-time Viewer Count**: Live viewer statistics
- **Chat Integration**: Real-time chat during streams
- **Stream Settings**: Configurable chat settings (followers-only, delays, etc.)

### Collaborative Whiteboards

- **Real-time Collaboration**: Multiple users can draw and interact simultaneously
- **Persistent Storage**: Whiteboard content is saved and synchronized
- **Drawing Tools**: Various drawing tools and colors
- **Live Cursors**: See other users' cursors in real-time

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and the React ecosystem
- UI components from [Radix UI](https://www.radix-ui.com/)
- Real-time features powered by [Socket.IO](https://socket.io/), [LiveKit](https://livekit.io/), and [Liveblocks](https://liveblocks.io/)
- Database management with [Prisma](https://www.prisma.io/)

## 📞 Support

If you have any questions or need help setting up the project, please:

- Open an issue on GitHub
- Check the documentation of the respective technologies used
- Refer to the environment setup guide above

---

**Made with ❤️ for the developer community**
