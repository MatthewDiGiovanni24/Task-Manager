# 📝 Task Manager – Full Stack Kubernetes & AWS Project

A full-stack **Task Manager application** built with **React**, **Node.js**, **Docker**, **Kubernetes**, and **AWS**.  
This project demonstrates a real-world cloud-native workflow from **local development** to **container orchestration** and **cloud deployment**.

![Frontend](/images/frontend.png)
![Backend](/images/backend.png)

---

## 🚀 Project Overview

This application allows users to:

- ✅ Create tasks  
- 🔄 Toggle task completion  
- ❌ Delete tasks  
- ☁️ Deploy locally with Docker & Kubernetes  
- ☁️ Cloud deployment on AWS (ECR + EKS)

---

## 🧱 Tech Stack

### Frontend
- React
- Fetch API
- Docker

### Backend
- Node.js
- Express
- REST API
- Docker

### Infrastructure & DevOps
- Docker
- Kubernetes (Minikube → AWS EKS)
- Amazon ECR (container registry)
- AWS CLI & eksctl

---

## 🗂️ Project Structure

```
.
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── k8s/
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── backend-service.yaml
│   └── frontend-service.yaml
│
└── README.md
```

---

## 🔄 Application Flow

```
User → React Frontend → Kubernetes Service → Node.js Backend → Response
```

---

## ☸️ Kubernetes (Minikube)

```bash
minikube start
kubectl apply -f k8s/
minikube service frontend-service
```

---

## ☁️ AWS – Cloud Phase

- Amazon ECR repositories
- Docker images pushed
- EKS cluster setup
