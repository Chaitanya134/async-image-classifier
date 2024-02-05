# Async image classifier

## Objective:

Develop a web-based application that allows users to upload images for classification. The system should process these images asynchronously, utilizing a queue-based system for handling image classification jobs. Users should be able to check the status of their submission (Pending or Completed) and view the classification result once it's available.

## Getting Started:

### 1. Clone the repo:

```
git clone https://github.com/Chaitanya134/async-image-classifier.git
cd async-image-classifier
```

### 2. Start Redis:

Redis is required for the queuing system to work.

If you have redis installed in you system already then run it.

If not, then use the provided docker container to start it:
`docker-compose -d up`

To stop the docker container:
`docker-compose down`

### 3. Install all dependencies:

```
npm install
# or
yarn install
# or
pnpm install
```

### 4. Environment variables:

Create a `.env` file at the root directory and fill it's values according to `.env.example`

### 5. Prisma types:

Generate prisma types

```
npx prisma generate
```

### 6. Run the development server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

## API Endpoints:

### 1. `/api/job`:

- Upload the image to Imagga server
- Create a new image classification job
  - Save the image chunks to database
  - Set the job status to pending
- Add the job to queue

### 2. `/api/job/completed/:jobId`:

- Webhook Url
- Set the job status to completed

### 3. `/api/job/pending/:jobId`:

- Used when retrying a failed job
- Set the job status to pending

## Queuing Mechanism:

### 1. User Uploads:

- Users can upload images through the web interface.
- The uploaded file is sent to the Imagga server for classification.
- The file is stored in the database using chunks of 1MB to optimize the upload process.

### 2. Pending State and Database Update:

- Upon upload, the file enters a "Pending" state and is saved to the MongoDB database.
- The database records the Imagga upload ID, allowing us to associate the file with its classification results.

### 3. Queue Limiter:

- The system is designed to handle one request every 10 seconds with a maximum of 1 request at a time, ensuring efficient resource utilization.
- This limiter is configured to control the flow of image classification jobs in the queue.

### 4. Queue Processing:

- As a new file enters the "Pending" state, it triggers a job in the BullMQ queue.
- The queue processes the job asynchronously and sends the file for classification to the Imagga server.

### 5. Imagga Classification:

- During classification, a mock error is introduced with a probability of 40% to simulate occasional failures.
- If successful, the results are stored in the database.

### 6. Webhooks and Database Update:

- Upon completion of the classification process, whether successful or with an error, a webhook updates the database with the results and the file moves to the "Completed" state..
- If successful, a bar graph showing all possible values and their probabilities is displayed to the user.
- In case of failure, a retry button is presented to the user.

### 7. Retry Mechanism:

- If classification fails, users can retry the process by clicking the retry button.
- This action sets the file back to the "Pending" state and adds it to the queue for reprocessing.
