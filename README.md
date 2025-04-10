Interacting with Kubernetes & Updating a Microservice

---
## Tools Used

- Node.js
- Docker
- Kubernetes (Minikube)
- kubectl CLI
- Git & GitHub

---
## PART I: Interacting with the Deployed Application

### 1. Start Minikube
minikube start
### 2. Apply Kubernetes Deployment and Service

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

### 3. Check Pod and Service Status
kubectl get pods
kubectl get services

### 4. Port Forward the Service
kubectl port-forward service/web-app-service 8080:3000

### Open your browser and test the following routes:
http://localhost:8080/add?num1=5&num2=3
http://localhost:8080/subtract?num1=10&num2=4
http://localhost:8080/health

PART II: Updating the Application
### 1. Code Update
A new /info route was added to the server.js file:

### 2. Rebuild Docker Image (Inside Minikube)
& minikube -p minikube docker-env | Invoke-Expression
docker build -t web-app:v2 .

### 3. Update Deployment to Use New Image
kubectl apply -f deployment.yaml

### 4. Re-test via Port Forwarding
kubectl port-forward service/web-app-service 8080:3000

### Test the new route in browser:
http://localhost:8080/info



