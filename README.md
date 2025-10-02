# 🚀 DevOps Learning Hub with Automated CI/CD to AWS

A React-based educational platform designed to help users learn DevOps through articles and hands-on practice — all integrated with a CI/CD pipeline that deploys automatically to AWS.

## 🌐 Features

- **Home Page** – Overview of the platform.
- **Articles Section** – DevOps-related tutorials and guides.
- **Playground Page** – A simulated CLI interface to practice bash commands with real-time feedback.

## ⚙️ DevOps & CI/CD Integration

This project includes a complete CI/CD pipeline using **GitHub Actions**:

- On every code push:
  - Runs linting and tests.
  - Builds a Docker image of the application.
  - Deploys the container to an **AWS EC2 instance** automatically.

## 🚀 Technologies Used

- **Frontend**: React
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Deployment**: AWS EC2

## 📦 Getting Started (Locally)

```bash
# Clone the repository
git clone https://github.com/your-username/devops-learning-hub.git

# Navigate to the project
cd devops-learning-hub

# Install dependencies
npm install

# Run the app locally
npm start
