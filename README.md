### This Code demonstrates the deployment of a Dockerized Node.js microservice onto a Kubernetes cluster using Minikube

 ### Tools Used

- Node.js
- Docker
- Kubernetes (Minikube)
- kubectl (Kubernetes CLI)
### Deployment Steps

### 1. Start Minikube (Local Kubernetes Cluster)
     -  minikube start --driver=docker
### 2. Point Docker to Minikube (to build images inside Minikube)
    -   & minikube -p minikube docker-env | Invoke-Expression
### 3. Build the Docker image inside Minikube
    - docker build -t web-app:v1 .
### 4. Create the Deployment File
### 5. Create the service file
### 6. Apply Kubernetes Configurations
    - kubectl apply -f deployment.yaml
    -kubectl apply -f service.yaml
### 7. Verify Deployment
   - kubectl get pods
   - kubectl get services
### 8.Access the Microservice
  - minikube service web-app-service
