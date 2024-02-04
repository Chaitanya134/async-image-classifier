# Async image classifier

## Objective:
Develop a web-based application that allows users to upload images for classification. The system should process these images asynchronously, utilizing a queue-based system for handling image classification jobs. Users should be able to check the status of their submission (Pending or Completed) and view the classification result once it's available.

## Requirements:

### Front-End:
- Design a simple user interface where users can:
  - Upload images for classification.
  - View the status of their submitted job (Pending or Completed).
  - View the classification result of the image once the job is completed.

### Back-End:
- Implement an API endpoint for image upload. Upon receiving an image, respond to the user that their job is scheduled.
- Implement a queuing system to manage incoming image classification requests.
- Develop a machine learning inferencing job that triggers when a request is received in the queue. This job should:
    - Classify the image using a pre-trained model.
    - Return the classification result to the back-end server upon completion.

### Database:
- Store job statuses and classification results in a database. Each entry should include:
  - A unique job ID.
  - The status of the job (Pending, Completed).
  - The classification result (once available).

### Job Status Checking:
- Allow users to check the status of their job through the front-end interface. Implement the necessary back-end logic to:
    - Query the database using the job ID.
    - Return the job status and classification result to the user.

## Deliverables:
- Source code for the front-end and back-end implementation.
- A brief documentation covering:
    - Setup and deployment instructions.
    - API endpoint details.
    - A high-level overview of the queuing and machine learning inferencing mechanism.
- Any scripts or commands needed to deploy the application and its dependencies.
