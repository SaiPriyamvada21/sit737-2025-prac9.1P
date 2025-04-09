# SIT737 - 2025 - Prac 5.2D: Dockerization and Cloud Deployment

## Overview


The microservice was originally developed in Task 5.1P. In this task, we package the application using Docker, push it to GCR, and validate that it can be pulled and run as a container.

---

## Files in this Repo

- `server.js` – Microservice source code
- `Dockerfile` – Instructions to build the container image
- `package.json` – Project dependencies
- `README.md` – Documentation of steps and deployment process

---

## Tools Used

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Google Cloud SDK (gcloud)](https://cloud.google.com/sdk/docs/install)
- [Google Container Registry (GCR)](https://cloud.google.com/container-registry)

---

## Deployment Steps
 Step 1: Install Prerequisites

- Node.js
- Docker Desktop
- Google Cloud SDK (`gcloud`)
- Google Cloud project with billing enabled

---

Step 2: Authenticate with Google Cloud

gcloud auth login
gcloud config set project sit737-docker-registry
gcloud auth configure-docker

### Step 3: Build Docker Image
docker build -t gcr.io/sit737-docker-registry/web-app:v1 .

### Step 4: Push Image to Google Container Registry
docker push gcr.io/sit737-docker-registry/web-app:v1


### Step 5: Pull and Run the Image Locally
docker pull gcr.io/sit737-docker-registry/web-app:v1
docker run -p 3000:3000 gcr.io/sit737-docker-registry/web-app:v1
