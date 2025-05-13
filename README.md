Tools used:
- Git
- Node.js
- Docker + Docker Hub
- Minikube
- Kubernetes
- MongoDB
- kubectl CLI
 
---
 
### How to Deploy
 
1️**Start Minikube**
minikube start

2 Apply MongoDB resources
kubectl apply -f mango-pv.yaml
kubectl apply -f mango-deployment.yaml
kubectl create secret generic mongo-secret --from-literal=username=mongouser --from-literal=password=mongopass

3️Build & push calculator app
docker build -t <your-dockerhub-username>/calculator-app .
docker push <your-dockerhub-username>/calculator-app

4️Apply calculator deployment
kubectl apply -f deployment.yaml

5️ Check running services
kubectl get services

How to Test the Endpoints
1.CRUD Examples (use curl or Postman)
 
1.Create
 
curl -X POST http://<minikube-ip>:<nodeport>/item \
     -H "Content-Type: application/json" \
     -d '{"name":"TestItem","value":42}'
2.Read
curl http://<minikube-ip>:<nodeport>/items

3.Update
curl -X PUT http://<minikube-ip>:<nodeport>/item/<item-id> \
     -H "Content-Type: application/json" \
     -d '{"name":"UpdatedItem","value":99}'
4.Delete
curl -X DELETE http://<minikube-ip>:<nodeport>/item/<item-id>

5.Backup & Recovery
  Backup MongoDB
kubectl exec -it <mongo-pod> -- \
mongodump --username mongouser --password mongopass --authenticationDatabase admin --out /backup
kubectl cp <mongo-pod>:/backup ./mongo-backup

Recovery
-- Use mongorestore to restore backups.
 
Monitoring and Check resource usage:
-- kubectl top pods
Check logs:
kubectl logs <mongo-pod>
kubectl logs <app-pod>
