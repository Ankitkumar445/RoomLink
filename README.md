# 🚀 RoomLink – Real-Time Collaborative Workspace

RoomLink is a modern real-time collaborative workspace that enables users to create private rooms for sharing code snippets, notes, files, images, and discussions. Built with Next.js and TypeScript, the platform provides a responsive and intuitive experience for developers, students, and teams collaborating online.

---

# ✨ Features

- 🔐 Create & Join Collaboration Rooms
- 💬 Real-Time Content Sharing
- 📄 Rich Text & Code Snippet Sharing
- 📁 File & Image Upload Support
- 🖼️ Image Preview
- ⚡ Fast State Synchronization
- 📱 Fully Responsive UI
- 🎨 Modern UI with Tailwind CSS & shadcn/ui
- 🚀 App Router Architecture
- 🔄 Redis-based Data Management
- 📂 Persistent Room Storage

---

# 🛠️ Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## State Management

- Zustand

## Backend

- Next.js API Routes

## Database & Storage

- Upstash Redis

## Libraries

- Framer Motion
- React Hook Form
- Sonner
- Lucide React

## Deployment

- Vercel

---

# 📂 Project Structure

```text
RoomLink/
│
├── app/
│   ├── api/
│   │   ├── rooms/
│   │   ├── uploadthing/
│   │   ├── cleanup/
│   │   ├── debug/
│   │   └── status/
│   │
│   ├── [roomId]/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── ContentCard.tsx
│   ├── ContentGrid.tsx
│   ├── CreateRoomButton.tsx
│   ├── FileUpload.tsx
│   ├── ImageUpload.tsx
│   └── RoomHeader.tsx
│
├── hooks/
├── lib/
│   ├── redis.ts
│   ├── storage.ts
│   ├── memory-store.ts
│   └── utils.ts
│
├── public/
├── store/
├── styles/
└── README.md
```

---

# 🏗️ System Architecture

```text
                     Users
                       │
                       ▼
              Next.js Frontend
                       │
         React + TypeScript + Tailwind
                       │
                Zustand Store
                       │
                       ▼
              Next.js API Routes
                       │
          ┌────────────┴─────────────┐
          ▼                          ▼
     Upstash Redis            UploadThing
          │                          │
          ▼                          ▼
     Room Data                Images & Files
```

---

# 📸 Screenshots

| Home | Room |
|------|------|
| <img width="1843" height="885" alt="image" src="https://github.com/user-attachments/assets/c0918137-bb2f-4325-8cfc-bc81e1447c39" />
 | <img width="1781" height="887" alt="image" src="https://github.com/user-attachments/assets/e9d98afd-3d7c-4a67-97f3-eaacafa89dce" />|

| File Upload | Image Upload |
|--------------|----------------|
| <img width="1722" height="886" alt="image" src="https://github.com/user-attachments/assets/dad052e8-b42d-41bb-9602-e1b2354326e7" />
 | <img width="1792" height="892" alt="image" src="https://github.com/user-attachments/assets/88758342-b3ce-4c05-93b0-8ce65fc1caec" /> |


---

# 🚀 Installation

```bash
# Clone repository

git clone https://github.com/yourusername/RoomLink.git

cd RoomLink

# Install dependencies

npm install

# Configure environment variables

cp .env.example .env.local

# Start development server

npm run dev
```

---

# ⚙️ Environment Variables

```env
UPSTASH_REDIS_REST_URL=

UPSTASH_REDIS_REST_TOKEN=

UPLOADTHING_SECRET=

UPLOADTHING_APP_ID=
```

---

# 🔌 API Routes

```text
/api/rooms
/api/uploadthing
/api/status
/api/cleanup
/api/debug
```

---

# 🔮 Future Improvements

- Real-time collaborative editing
- WebSocket support
- User Authentication
- Role-based Room Permissions
- Notifications
- Version History
- Dark Mode
- Video & Voice Collaboration

---

# 👨‍💻 Author

**Ankit Kumar**

- GitHub: https://github.com/Ankitkumar445
- LinkedIn: https://www.linkedin.com/in/ankit-kumar-035083304/
- Portfolio: https://selfprofile-phi.vercel.app/
