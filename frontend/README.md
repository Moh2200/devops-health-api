![CI](https://github.com/Moh2200/devops-health-api/actions/workflows/docker.yml/badge.svg)

# DevOps Health API

A complete DevOps portfolio project demonstrating a full workflow from code to live cloud deployment.

---

## 🔗 Live Demo

- Backend (Azure):  
  https://ca-devops-health-api.gentlecoast-45125362.norwayeast.azurecontainerapps.io

- Frontend Dashboard (Vercel):  
  https://devops-health-api.vercel.app

---

## 🚀 What this project demonstrates

- Node.js + TypeScript backend
- Docker containerization
- GitHub Actions CI/CD pipeline
- GitHub Container Registry (GHCR)
- Azure Container Apps deployment
- Live frontend consuming backend API

---

## ⚙️ System Architecture

User → Frontend (Vercel) → Backend API (Azure Container Apps)

---

### 🔄 Delivery Flow (CI/CD)

Code → GitHub → GitHub Actions → Docker Image → GHCR → Azure Container Apps

## 📡 API Endpoints

- `/health` → basic health check
- `/info` → runtime information (environment, version, time)

---

## 🧠 Why this project

The goal is to demonstrate practical DevOps and platform engineering skills in a simple, real-world setup:

- Automated build and deployment
- Container-based architecture
- Cloud hosting with public access
- Separation between frontend and backend

---

## 📌 Notes

- Frontend is deployed separately (Vercel) to simulate real production architecture
- Backend is containerized and deployed on Azure Container Apps
- CI/CD automatically triggers on every push to `main`

---

## 👨‍💻 Author

Mohammad Abdalmuhsen
GitHub: https://github.com/Moh2200
