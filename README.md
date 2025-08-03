# Apollo Health Care - Frontend

A modern, comprehensive healthcare management system frontend built with Next.js 14, designed to streamline communication and appointment processes between patients, doctors, and administrators.

## 🌟 Overview

Apollo Health Care is a robust telemedicine platform that enables seamless interaction between healthcare providers and patients. This frontend application provides an intuitive interface for appointment booking, patient management, doctor consultations, and administrative tasks.

## 🚀 Features

### For Patients

- **Account Management**: User registration, login, and profile management
- **Appointment Booking**: Schedule appointments with available doctors
- **Medical Records**: Upload and manage diagnostic reports and medical history
- **Prescription Access**: View and download prescriptions
- **Payment Integration**: Secure payment processing for consultations
- **Doctor Reviews**: Rate and review healthcare providers
- **Video Consultations**: Real-time communication with doctors via Agora.io

### For Doctors

- **Appointment Management**: View and manage upcoming appointments
- **Patient Profiles**: Access comprehensive patient information and history
- **Prescription Management**: Generate and send prescriptions via email
- **Schedule Management**: Set available time slots for appointments
- **Video Consultations**: Conduct virtual consultations with patients

### For Administrators

- **Doctor Management**: Create and manage doctor accounts
- **Appointment Oversight**: Monitor and manage all appointments
- **Schedule Management**: Create and modify appointment slots
- **Analytics Dashboard**: View system metrics and reports

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: SASS/SCSS, Material-UI (MUI)
- **State Management**: Redux Toolkit with RTK Query
- **Forms**: React Hook Form with Zod validation
- **Video Calls**: Agora React UIKit
- **HTTP Client**: Axios
- **Date Handling**: Day.js
- **Charts**: Recharts
- **Notifications**: Sonner
- **Package Manager**: PNPM

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (withCommonLayout)/       # Public pages layout
│   ├── (withDashboardLayout)/    # Dashboard layout
│   ├── api/                      # API routes
│   ├── globals.scss              # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── Forms/                    # Form components
│   ├── shared/                   # Shared components
│   ├── Styled/                   # Styled components
│   └── ui/                       # UI components
├── constants/                    # Application constants
├── helpers/                      # Helper functions
├── hooks/                        # Custom React hooks
├── lib/                          # Library configurations
│   ├── Providers/                # Context providers
│   └── theme/                    # Theme configuration
├── redux/                        # Redux store setup
│   └── api/                      # RTK Query API slices
├── schemas/                      # Zod validation schemas
├── services/                     # API services
├── types/                        # TypeScript type definitions
└── utils/                        # Utility functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm
- Git

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/SazidulAlam47/apollo-health-care-client.git
    cd apollo-health-care-client
    ```

2. **Install dependencies**

    ```bash
    pnpm install
    ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

    ```env
    NEXT_PUBLIC_API_URL=your_backend_api_url
    NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    # Add other environment variables as needed
    ```

4. **Run the development server**

    ```bash
    pnpm dev
    ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🔧 Configuration

### Theme Configuration

The application uses Material-UI with custom theming. Theme configurations can be found in `src/lib/theme/`.

### Redux Store

State management is handled by Redux Toolkit with RTK Query for API calls. Store configuration is in `src/redux/store.ts`.

### Form Validation

All forms use React Hook Form with Zod schemas for validation. Schemas are located in `src/schemas/`.

## 🎨 UI Components

The application features a comprehensive set of reusable UI components:

- **HomePage Components**: Hero section, specialties, top-rated doctors, how it works
- **Form Components**: Custom form inputs with validation
- **Dashboard Components**: Admin and doctor dashboard interfaces
- **Shared Components**: Headers, footers, navigation, modals

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin, Doctor, Patient)
- Protected routes and middleware
- Secure token storage and management

## 🎥 Video Consultation

Integrated with Agora.io for real-time video consultations:

- High-quality video and audio
- Screen sharing capabilities
- Chat functionality during calls
- Recording options

## 📊 State Management

- **Redux Toolkit**: For global state management
- **RTK Query**: For efficient API calls and caching
- **React Hook Form**: For form state management

## 🧪 Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting with custom rules
- **Prettier**: Code formatting
- **Zod**: Runtime type validation
