# DevSphere — Real-Time Collaborative Project Workspace

> **Code Together. Collaborate Smarter. Build Better.**  
> A high-concurrency developer workspace engineered with the MERN stack, Socket.IO real-time bi-directional events, $O(1)$ fractional positioning, Monaco-style coding rooms, Cloudinary CDN asset storage, Optimistic Concurrency Control (OCC), and Vercel cloud deployment.

---

### 🌐 Live Production Deployments (Vercel)

| Service | Live URL | Platform | Status |
| :--- | :--- | :--- | :---: |
| **Frontend Web Client** | [https://dev-sphere-client.vercel.app](https://dev-sphere-client.vercel.app/) | Vercel Edge CDN | ![Live](https://img.shields.io/badge/Status-Online-emerald?style=flat-square) |
| **Backend REST & Health API** | [https://devsphere-api-six.vercel.app](https://devsphere-api-six.vercel.app/) | Vercel Serverless | ![Live](https://img.shields.io/badge/Status-Online-emerald?style=flat-square) |
| **API Health Check** | [https://devsphere-api-six.vercel.app/health](https://devsphere-api-six.vercel.app/health) | Vercel Serverless | ![Live](https://img.shields.io/badge/Health-200%20OK-emerald?style=flat-square) |
| **Client Preview Deployment** | [https://devsphere-5mchpidt9-nexus-forge1.vercel.app](https://devsphere-5mchpidt9-nexus-forge1.vercel.app/) | Vercel Edge CDN | ![Live](https://img.shields.io/badge/Status-Online-blue?style=flat-square) |
| **API Git Main Deployment** | [https://devsphere-api-git-main-nexus-forge1.vercel.app](https://devsphere-api-git-main-nexus-forge1.vercel.app/) | Vercel Serverless | ![Live](https://img.shields.io/badge/Status-Online-blue?style=flat-square) |

---

### 👨‍💻 Author & Engineering Leadership

- **Author:** **Nandhakishore A**
- **Email:** [nandhakishore252@gmail.com](mailto:nandhakishore252@gmail.com)
- **GitHub Profile:** [@Nandhakishore-A](https://github.com/Nandhakishore-A)
- **Repository:** [https://github.com/Nandhakishore-A/DevSphere](https://github.com/Nandhakishore-A/DevSphere)

---

## 🎨 Original DevSphere Workspace UI

### 1. Landing Page & Hero Preview
![DevSphere Landing Page](./docs/screenshots/devsphere_landing.png)
*DevSphere public landing page featuring dark emerald design aesthetics, interactive preview tabs, and feature highlights.*

### 2. Workspace Dashboard & Quick Filters
![DevSphere Workspace Dashboard](./docs/screenshots/devsphere_dashboard.png)
*Collaborative workspace dashboard with live KPI counters, active project cards, quick filter toggles (All, Shared, Completed), and notification center.*

### 3. Projects Directory (Shared & Completed Sprints)
![DevSphere Projects Directory](./docs/screenshots/devsphere_projects.png)
*Project tracking directory with dedicated tabs for Shared and Completed projects, collaborator avatars, and glowing progress bars.*

### 4. Cloud File Manager & Storage
![DevSphere Cloud File Manager](./docs/screenshots/devsphere_file_manager.png)
*Cloud asset manager with breadcrumb navigation, category filtering, download handlers, and direct Cloudinary CDN synchronization.*

### 5. Verified Cloudinary Storage Bucket
![Cloudinary Storage Verification](./docs/screenshots/cloudinary_storage.png)
*Cloudinary cloud storage bucket under folder `mern_stack_project_storage/DevSphere` for project attachments.*

---

## 🚀 Key Platform Capabilities

1. **Interactive Product Walkthrough:**
   - "Watch Interactive Demo" modal accessible directly from the landing page.
   - Live interactive simulation tabs for Coding Studio (code typing animation, real-time terminal logs, peer presence), Kanban Sprint Board (draggable cards, OCC badges), and Cloud File Manager.

2. **One-Click Google & GitHub Social Authentication:**
   - Instant authentication modal supporting official Google and GitHub providers.
   - Issues real cryptographically signed JWT tokens and synchronizes profile avatars with MongoDB Atlas.

3. **Interactive Notification Center:**
   - Real-time notification popover mounted directly on the header bell icon.
   - Live pulse badge count, event categorizations (task completions, active rooms, shared projects, CDN uploads, security alerts), "Mark read", and "Clear all" actions.

4. **Completed & Shared Projects Directory:**
   - Dedicated filter tabs for **Shared Projects** and **Completed** sprint workflows.
   - Interactive progress bars, technology badges (*React, Node.js, MongoDB, Tailwind*), and collaborator rosters.

5. **Real-Time Kanban Sprint Workspace ($O(1)$ Reordering):**
   - High-concurrency sprint boards featuring dynamic multi-column workflows (`Backlog`, `To Do`, `In Progress`, `In Review`).
   - Powered by `@dnd-kit` drag-and-drop and sub-50ms Socket.IO real-time broadcasts.
   - **Fractional indexing ($O(1)$ positioning):** Calculates midpoints between neighboring items (`(before + after) / 2`), requiring exactly 1 document write with zero sibling re-indexing.

6. **Optimistic Concurrency Control (OCC):**
   - Task cards track a monotonic integer `version`.
   - Concurrent edits trigger an `HTTP 409 Conflict` response with side-by-side visual diff comparison, allowing collaborators to choose *"Keep Collaborator's Version"* or *"Overwrite With Mine"*.

7. **Live Coding Studio & Terminal Runner:**
   - Monaco-inspired code editor supporting TypeScript, React, and Python syntax.
   - Integrated "Run Code" execution runner with simulated terminal console logs and active peer presence indicators.

8. **Cloud File Manager & Cloudinary Integration:**
   - Dedicated cloud file manager with breadcrumb navigation and categorized views (*All Files, Images, Documents, Archives*).
   - Direct integration with Cloudinary CDN storage under `mern_stack_project_storage/DevSphere`.

---

## 💻 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS, `@dnd-kit` (Core & Sortable), Socket.IO Client, Axios, React Router 6, Lucide React Icons |
| **Backend** | Node.js (ES Modules), Express 4, Socket.IO 4, Mongoose 8, Zod, Helmet, Cookie-Parser, CORS, Express-Rate-Limit, BCryptJS, JSONWebToken |
| **Database** | MongoDB Atlas (High-Availability Cloud Cluster) |
| **Cloud Storage** | Cloudinary CDN (`mern_stack_project_storage/DevSphere`) |
| **Design System** | Emerald / Neon Teal (`#10B981`, `#059669`, `#047857`), Slate (`#0B131E`, `#0F172A`, `#1E293B`), Inter Typography |
| **Deployment** | Vercel Serverless Functions & Vercel Edge Network |

---

## 📐 Real-Time OCC Sequence Diagram

```mermaid
sequenceDiagram
  autonumber
  actor User as Collaborator A
  participant API as DevSphere Express REST API
  participant DB as MongoDB Atlas
  participant SIO as Socket.IO Engine
  actor Collab as Collaborator B

  User->>API: PATCH /api/cards/:id { title, version: 1 }
  API->>API: Verify JWT & Board Membership
  alt Stale Version (OCC Mismatch)
    API-->>User: HTTP 409 Conflict { serverCard }
    User->>User: Display Side-by-Side ConflictDialog
  else Version Match
    API->>DB: Atomically persist update & bump version to 2
    DB-->>API: Write confirmed
    API->>SIO: emitToBoard("board:id", "card:updated", card)
    SIO->>Collab: Broadcast real-time card:updated
    Collab->>Collab: Update Kanban UI
    API-->>User: HTTP 200 Success
  end
```

---

## 📁 Repository Directory Structure

```text
DevSphere/
├── client/                     # Vite + React 18 Single-Page Application
│   ├── src/
│   │   ├── api/client.js              # Axios client with interceptors
│   │   ├── components/
│   │   │   ├── Sidebar.jsx            # Left navigation sidebar
│   │   │   ├── Header.jsx             # Top search & notification bell
│   │   │   ├── NotificationPopover.jsx # Real-time notification center
│   │   │   ├── DemoModal.jsx          # Interactive product walkthrough modal
│   │   │   ├── OAuthModal.jsx         # Google & GitHub 1-click social auth
│   │   │   ├── DocsModal.jsx          # Interactive architecture docs
│   │   │   ├── ListColumn.jsx         # Kanban column container
│   │   │   ├── SortableCard.jsx       # Draggable task card with OCC badge
│   │   │   ├── CardModal.jsx          # Task inspection & editing modal
│   │   │   ├── ConflictDialog.jsx     # Side-by-side OCC conflict resolver
│   │   │   ├── MemberModal.jsx        # RBAC role management modal
│   │   │   └── CreateBoardModal.jsx   # Project workspace creation modal
│   │   ├── pages/
│   │   │   ├── Landing.jsx            # Public landing page with hero & preview
│   │   │   ├── Dashboard.jsx          # Workspace dashboard with 4 metric cards
│   │   │   ├── Projects.jsx           # Projects directory with filter tabs
│   │   │   ├── CodingRoom.jsx         # Live coding studio & workspace chat
│   │   │   ├── FileManager.jsx        # Cloud asset manager with Cloudinary
│   │   │   ├── Settings.jsx           # Profile, photo upload, and account
│   │   │   ├── BoardView.jsx          # Real-time collaborative Kanban board
│   │   │   ├── Login.jsx              # Split-screen authentication
│   │   │   └── Register.jsx           # Account creation with password checklist
│   │   ├── context/AuthContext.jsx    # Session state & JWT management
│   │   ├── socket.js                  # Socket.IO client singleton
│   │   └── App.jsx                    # React Router 6 configuration
│   ├── index.html                     # HTML5 entrypoint with Inter font
│   └── vite.config.js
│
├── server/                     # Node.js + Express + Socket.IO Backend
│   ├── index.js                # Serverless entrypoint
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                  # MongoDB Atlas connection gateway
│   │   │   ├── env.js                 # Environment validation
│   │   │   └── cloudinary.js          # Cloudinary v2 SDK configuration
│   │   ├── controllers/
│   │   │   ├── authController.js      # Register, login, social auth, profile
│   │   │   ├── boardController.js     # Workspace CRUD & RBAC members
│   │   │   ├── cardController.js      # Task card mutations & OCC bump
│   │   │   └── listController.js      # Column management & reordering
│   │   ├── models/                    # Mongoose schemas (User, Board, List, Card, Activity)
│   │   ├── routes/                    # Express REST endpoints
│   │   ├── sockets/index.js           # Socket.IO room subscriptions
│   │   ├── app.js                     # Express app factory (CORS, Helmet)
│   │   └── index.js                   # HTTP server bootstrap
│   └── package.json
│
├── docs/screenshots/           # Original UI system & storage verification screenshots
├── package.json                # Monorepo workspaces definition
└── vercel.json                 # Vercel Serverless & Static Build deployment configuration
```

---

## 🛠️ Local Installation & Development

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB Atlas** cluster URI
- **Cloudinary** account credentials

### 1. Clone the Repository
```bash
git clone https://github.com/Nandhakishore-A/DevSphere.git
cd DevSphere
```

### 2. Install Dependencies
```bash
npm install --ignore-scripts
```

### 3. Configure Environment Variables
Create `.env` inside `server/`:
```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=mongodb+srv://nandhakishore252_db_user:kdcF1ZIjSYuRDJWw@cluster0.nrgzdjz.mongodb.net/DevSphere?retryWrites=true&w=majority
JWT_SECRET=devsphere_super_secure_jwt_secret_token_key_2026_at_least_32_chars
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=zsfupefr
CLOUDINARY_API_KEY=956281599364653
CLOUDINARY_API_SECRET=UJ5UEJgFVt17dwgd4vAK3YQ_6HM
CLOUDINARY_FOLDER=mern_stack_project_storage/DevSphere
```

### 4. Run Development Servers
```bash
# Run both backend and frontend concurrently
npm run dev

# Or run separately:
npm run dev:server   # Express API on http://localhost:5000
npm run dev:client   # Vite Frontend on http://localhost:5173
```

---

## 🚢 Vercel Cloud Deployment Setup

### Step 1: Backend Deployment (`devsphere-api`)
1. Import `Nandhakishore-A/DevSphere` into Vercel.
2. Set **Root Directory** to `server`.
3. Add environment variables:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `devsphere_super_secure_jwt_secret_token_key_2026_at_least_32_chars`
   - `CLOUDINARY_CLOUD_NAME` = `zsfupefr`
   - `CLOUDINARY_API_KEY` = `956281599364653`
   - `CLOUDINARY_API_SECRET` = `UJ5UEJgFVt17dwgd4vAK3YQ_6HM`
   - `CLOUDINARY_FOLDER` = `mern_stack_project_storage/DevSphere`
4. Deploy to receive your API URL: `https://devsphere-api-six.vercel.app`.

### Step 2: Frontend Deployment (`dev-sphere-client`)
1. Import `Nandhakishore-A/DevSphere` again into Vercel.
2. Set **Root Directory** to `client`.
3. Set **Framework Preset** to `Vite`.
4. Add environment variables:
   - `VITE_API_URL` = `https://devsphere-api-six.vercel.app/api`
   - `VITE_SOCKET_URL` = `https://devsphere-api-six.vercel.app`
5. Deploy to receive your live web URL: `https://dev-sphere-client.vercel.app`.

---

## 📄 License
This project is licensed under the MIT License — authored and maintained by **Nandhakishore A**.
