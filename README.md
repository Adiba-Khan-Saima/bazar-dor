# বাজার দর | BazarDor

BazarDor is a responsive web application for checking the latest prices of daily essential products in Bangladesh. Users can view product prices, price changes, category-wise products, market-based prices, and detailed product information.

## Features

- View today's prices of essential products
- See products whose prices increased today
- See products whose prices decreased today
- Browse products by category
- Sort products from low to high price
- Sort products from high to low price
- View detailed product information
- View minimum, maximum, and average prices
- View market-wise product prices
- Email and Password Sign Up
- Email and Password Sign In
- Google Login
- GitHub Login
- Logout functionality
- User profile page
- Update user information
- Protected product details page
- Loading skeletons
- Infinite moving price ticker
- Friendly 404 and invalid route handling
- Responsive design for mobile, tablet, and desktop

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Better Auth
- MongoDB
- MongoDB Atlas
- Lucide React
- React Hot Toast
- Programming Hero BazarDor API

## API

Official BazarDor API:

```text
https://openapi.programming-hero.com/api/bazardor
```

## Authentication

The project supports:

- Email and Password Sign Up
- Email and Password Sign In
- Google Login
- GitHub Login
- Logout
- Social Account Linking

Authentication is implemented using Better Auth and MongoDB.

## Main Routes

```text
/
/signin
/signup
/profile
/profile/update
/category/[slug]
/product/[slug]
```

## Product Categories

- চাল
- ডাল
- তেল
- সবজি
- মাছ
- মাংস
- ডিম-দুধ
- মসলা

## Environment Variables

Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Do not share or commit your actual secret values.

## Run Locally

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the project in your browser:

```text
http://localhost:3000
```

## Project Name

**বাজার দর | BazarDor**