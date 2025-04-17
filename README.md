# g_scores_app

## Previews
1. Dashboard page:
   
![image](https://github.com/user-attachments/assets/21549228-8a97-4c3b-a143-1e89685bf111)

2. Search Student Scores page:
   
![image](https://github.com/user-attachments/assets/f4c7343e-ad24-4f3b-90f8-f7476499b82d)

3. Scores Reports page:
   
![image](https://github.com/user-attachments/assets/2ef4714d-ce4c-4d9c-a988-286fb20c2bcf)

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

### Steps to seed data

1. Navigate to the backend directory:
   ```bash
   cd g_scores_app_be
   ```
2. Start only the database service using Docker Compose:
   ```bash
   docker-compose up db
   ```
3. Open a new terminal and navigate to the backend directory:
   ```bash
   cd g_scores_app_be
   ```
4. Run the following commands to set up the database:
   - Create the database:
     ```bash
     docker-compose run app rails db:create
     ```
   - Run migrations:
     ```bash
     docker-compose run app rails db:migrate
     ```
   - Seed the database:
     ```bash
     docker-compose run app rails db:seed
     ```

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
