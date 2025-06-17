# FileShare - Free File Transfer System

A modern, responsive file transfer platform that allows users to send and receive files between devices over the internet without any cost or registration.

## 🚀 Features

- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Secure Share Codes**: Generate unique 6-character codes for file sharing
- **Real-time Feedback**: Loading states, progress indicators, and toast notifications
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Registration**: Start sharing files immediately
- **Auto-Expiry**: Files automatically deleted after 24 hours
- **File Size Limit**: 5GB maximum to accommodate large files

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **React Router** for navigation

### Backend (To be implemented)
- **Spring Boot** (Java 17+)
- **MySQL** database
- **Spring Data JPA**
- **RESTful API**

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 16+ and npm
- Java 17+ (for backend)
- MySQL 8+ (for backend)

### Frontend Setup

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd fileshare-frontend
npm install
```

2. **Start development server:**
```bash
npm start
```

3. **Open browser:**
Navigate to `http://localhost:3000`

### Backend Setup (Coming Soon)

The Spring Boot backend will include:
- File upload endpoint (`POST /api/files/upload`)
- File download endpoint (`GET /api/files/download/{code}`)
- File info endpoint (`GET /api/files/info/{code}`)
- Automatic file expiry system
- MySQL database integration

## 🌐 Internet Access Setup

### Option 1: Ngrok (Recommended for Development)

1. **Download and install ngrok:**
```bash
# Install ngrok
npm install -g ngrok

# Expose your backend (assuming it runs on port 8080)
ngrok http 8080
```

2. **Update frontend API URL:**
Update the API base URL in your environment:
```bash
REACT_APP_API_URL=https://your-ngrok-url.ngrok.io
```

### Option 2: Port Forwarding

1. **Configure your router:**
   - Log into your router admin panel
   - Forward port 8080 to your local machine
   - Note your public IP address

2. **Update API configuration:**
```bash
REACT_APP_API_URL=http://your-public-ip:8080
```

## 📱 Usage

### Sending Files

1. **Upload File:**
   - Drag and drop a file or click "Choose File"
   - Click "Upload File" button
   - Wait for upload to complete

2. **Share Code:**
   - Copy the generated 6-character code
   - Send the code to the recipient via any messaging platform

### Receiving Files

1. **Enter Code:**
   - Go to the download section
   - Enter the 6-character share code
   - Click the search button

2. **Download File:**
   - Review file information
   - Click "Download File" to save to your device

## 🔒 Security Features

- **File Size Limits**: Maximum 5GB per file
- **Auto-Expiry**: Files deleted after 24 hours
- **Unique Codes**: Cryptographically secure share codes
- **Path Traversal Protection**: Secure file storage and retrieval
- **CORS Configuration**: Properly configured cross-origin requests

## 🚀 Deployment

### Local Development
```bash
# Frontend
npm start

# Backend (when implemented)
./mvnw spring-boot:run
```

### Production Deployment
```bash
# Build frontend
npm run build

# Deploy built files to your web server
# Configure backend with production database
# Set up reverse proxy (nginx/apache)
```

## 🛡️ Security Considerations

- Files are stored locally on the server filesystem
- Share codes are generated using cryptographically secure methods
- File metadata is stored securely in MySQL database
- Automatic cleanup prevents storage bloat
- CORS policies restrict unauthorized access

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend root:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_MAX_FILE_SIZE=5368709120
REACT_APP_FILE_EXPIRY_HOURS=24
```

Backend configuration (application.properties):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/file_transfer
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
file.upload.directory=./uploads/
file.max.size=5368709120
file.expiry.hours=24
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify backend is running and accessible
3. Ensure database connection is working
4. Check network connectivity and firewall settings

## 🔮 Future Enhancements

- [ ] QR code generation for easy mobile sharing
- [ ] Password-protected downloads
- [ ] Admin panel for file management
- [ ] Download analytics and counters
- [ ] Email notifications
- [ ] Bulk file uploads
- [ ] File compression options
