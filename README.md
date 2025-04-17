# g_scores_app

## Backend (BE) Setup with Docker

### Prerequisites
- Docker installed on your system

### Steps to Run the Backend
1. Navigate to the backend directory:
   ```bash
   cd g_scores_app_be
   ```
2. Build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```
3. The backend should now be running. By default, it will be accessible at `http://localhost:8000`.

### Additional Commands
- To stop the containers:
  ```bash
  docker-compose down
  ```
- To rebuild without using the cache:
  ```bash
  docker-compose build --no-cache
  ```

## Frontend (FE) Setup with Yarn

### Prerequisites
- Node.js and Yarn installed on your system

### Steps to Run the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd g_scores_app_fe
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```
4. The frontend should now be running. By default, it will be accessible at `http://localhost:5173`.

### Additional Commands
- To build the frontend for production:
  ```bash
  yarn build
  ```
- To preview the production build:
  ```bash
  yarn preview
  ```

# Environment Configuration

To run the application, you need to configure environment variables for both the backend and frontend. Below are the steps to set up the `.env` files.

## Backend (BE) Environment Configuration

1. Create a `.env` file in the `g_scores_app_be` directory if it doesn't already exist.
2. Add the following environment variables to the `.env` file:

   ```env
   DATABASE_HOST=localhost # Replace with your database host
   DATABASE_NAME=g_scores_db # Replace with your database name
   DATABASE_USERNAME=root # Replace with your database username
   DATABASE_PASSWORD= # Replace with your database password
   RAILS_ENV=development
   SECRET_KEY_BASE=your_secret_key # Generate using `rails secret`
   ```

## Frontend (FE) Environment Configuration

1. Create a `.env` file in the `g_scores_app_fe` directory if it doesn't already exist.
2. Add the following environment variables to the `.env` file:

   ```env
   VITE_API_BASE_URL=http://localhost:8000 # Replace with your backend API base URL
   ```