 Eventrix

Eventrix is a student community event management platform designed to streamline the discovery, creation, and management of events across campus clubs, councils, cells, and fests. It provides a modern interface for both students and coordinators, with seamless email notifications and personalized event tracking.

 Features

 Student Users
- Browse and discover upcoming events.
- Subscribe to clubs, councils, cells, or fests.
- Receive email notifications 30 minutes before subscribed events start.
- View and manage a personalized Favourites section.
- Edit and update personal information, including password.

 Admins (Coordinators)
- Create, update, and delete events.
- Manage entity profiles (e.g., Club info, Coordinators list, etc.).

 Tech Stack
Frontend
- React.js
- Tailwind CSS – for responsive and modern UI
- React Router – for routing

Backend
- Node.js
- Express.js
- MongoDB – for storing users, entities, and events
- Mongoose – for MongoDB object modeling

Other Tools
- Nodemailer – to send email notifications
- JWT (JSON Web Tokens) – for user authentication
- Cloudinary / Multer – for image uploads (if used)


 Getting Started

Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas or local instance
- [Optional] Cloudinary account for image uploads

 Installation

1. Clone the repo
git clone https://github.com/your-username/eventrix.git
cd eventrix

2. Install dependencies
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

3. Set up environment variables

Create .env files in both server/ and optionally client/:

server/.env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

client/.env (optional)
VITE_API_URL=http://localhost:5000

4. Run the project
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev

 Email Notifications
- Implemented via Nodemailer.
- Scheduled email reminders go out 30 minutes before an event.

 Image Uploads
- Uses Multer or Cloudinary for uploading entity and event images.
- Image previews are shown in the event creation form for better UX.

 Authentication
- JWT-based authentication for secure login and protected routes.
- Different access levels for students and coordinators.

 Future Improvements
- Mobile app version with React Native or Flutter.
- Admin dashboard with analytics.
- RSVP and ticketing system for large events.
- Comments or feedback section for past events.

 Contributors
- Jayant Mitawa
- Priyen Parmar
- Divyansh Bansal
- Rahman
- Mohit Parihar
- Pranav Krishna
- Nisar Shlok
- Chaitanya Vishnoi
- Hemant
- Sharmila
