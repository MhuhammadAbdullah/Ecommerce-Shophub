# Ecommerce-Shophub - Modern eCommerce Platform

A full-featured, responsive eCommerce website built with React, Vite, and Tailwind CSS.

![ShopHub Screenshot](https://images.pexels.com/photos/6214472/pexels-photo-6214472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## Features

- 🛍️ Product browsing with categories and search
- 🛒 Shopping cart with persistent storage
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🔐 User authentication
- 👤 User profiles and order history
- 📦 Order management
- 🎨 Modern, clean UI with Tailwind CSS
- ⚡ Fast performance with Vite
- 🔧 Admin dashboard for product management

## Tech Stack

- React 18
- Vite
- TypeScript
- React Router DOM
- Tailwind CSS
- Lucide React Icons
- Context API for state management

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shophub.git
cd shophub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Layout components
│   └── ui/            # UI components
├── context/           # React Context providers
├── data/             # Mock data and API
├── pages/            # Page components
├── types/            # TypeScript types
└── main.tsx          # App entry point
```

## Features in Detail

### Authentication
- Email/password login
- User registration
- Protected routes
- Admin access control

### Shopping
- Product browsing with categories
- Search functionality
- Shopping cart with quantity management
- Secure checkout process
- Order confirmation

### User Features
- Profile management
- Order history
- Payment method management
- Account settings

### Admin Features
- Product management (CRUD)
- Order management
- Customer management
- Dashboard analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)
