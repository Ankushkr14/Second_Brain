# 🧠 Second Brain

> **Build your digital second brain to manage notes, bookmarks, tasks, and ideas — all in one immersive space.**

Second Brain is a full-stack knowledge management application that helps you capture ideas instantly and access knowledge seamlessly. Think of it as your personal digital workspace where you can store, organize, and retrieve all your important content in one place.

## ✨ Features

### Core Functionality
- **📝 Content Management**: Save and organize notes, links, documents, and media
- **🏷️ Smart Tagging**: Tag content for easy categorization and retrieval
- **🔍 Advanced Search**: Find your content quickly with powerful search and filtering
- **📚 Content Types**: Support for various content types (notes, URLs, documents, etc.)
- **🔄 Real-time Sync**: Your content stays synchronized across sessions

### Sharing & Collaboration
- **🔗 Content Sharing**: Share individual pieces of content with others
- **🌐 Public Brain**: Make your entire knowledge base publicly accessible
- **📤 Link Sharing**: Generate shareable links for your content
- **🔒 Privacy Controls**: Control what's public and what stays private

### User Experience
- **🎨 Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **⚡ Fast Performance**: Optimized for speed with efficient data loading
- **📱 Mobile Friendly**: Works seamlessly on desktop and mobile devices
- **🔐 Secure Authentication**: JWT-based authentication system
- **💫 Loading States**: Smooth loading experiences throughout the app

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and context
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Elegant notifications
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side code
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ankushkr14/Second_Brain.git
   cd Second_Brain
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   ```
   
   Create a `.env` file in the Backend directory:
   ```env
   PORT=3000
   DB=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Update `src/config.ts` with your backend URL:
   ```typescript
   export const BACKEND_URL = "http://localhost:3000";
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
Second_Brain/
├── Backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database and configuration
│   │   ├── controller/     # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── assets/         # Static assets
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🎯 Usage

### Creating Content
1. Sign up for an account or log in
2. Click the "+" button to create new content
3. Choose content type (note, link, etc.)
4. Add title, content, and tags
5. Save to add it to your Second Brain

### Organizing Content
- Use **tags** to categorize your content
- Use the **search function** to find specific items
- **Filter** content by type or tags
- Access everything from your **dashboard**

### Sharing Content
- Share individual content pieces with generated links
- Make your entire brain public for others to explore
- Control privacy settings for each piece of content

## 🔧 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - User login

### Content Management
- `POST /content` - Add new content
- `GET /content` - Get all user content
- `GET /content/:id` - Get specific content
- `DELETE /content/:id` - Delete content

### Sharing
- `POST /content/:id/share` - Create shareable link
- `GET /share/:linkId` - Access shared content
- `DELETE /share/:linkId` - Revoke shared link

### Brain Settings
- `PUT /brain/toggle` - Toggle brain public/private
- `GET /brain/settings` - Get brain settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Ankush Kumar**
- GitHub: [@Ankushkr14](https://github.com/Ankushkr14)
- LinkedIn: [ankushkr14](https://www.linkedin.com/in/ankushkr14/)
- Email: me.ankushkr@gmail.com

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by the concept of "Building a Second Brain" by Tiago Forte
- Built with modern web technologies for optimal performance

---

**Start building your Second Brain today!** 🧠✨
