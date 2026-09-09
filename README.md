##CropSense AI Platform

SIH 2026 --- SIH26131

Problem Statement: Early detection and management of crop diseases
and pest infestations

CropSense is a software-only AI-powered crop health intelligence
platform designed to help farmers detect crop diseases and pest
infestations early, understand local risk, receive actionable
advisories, and help agricultural officers monitor and validate emerging
threats.

👥 Team Responsibilities

Team Member             Responsibility

Rahul Singh         Frontend Development
Manish Kumar        Backend Development
Harsh Singh         Backend Development
Vaishali Sharma     PPT / Presentation
Garima Agrawal      AI / ML
Rishika Chaudhary   AI / ML

🎨 Frontend --- Rahul Singh

Responsible for the complete user-facing interface and frontend
experience.

Responsibilities

Next.js / React development

TypeScript

Tailwind CSS

Responsive UI

Farmer dashboard

Crop scanning interface

AI diagnosis result screens

Risk intelligence UI

Weather interface

GIS/map integration UI

Farmer advisory interface

Officer dashboard frontend

Charts and data visualization

Animations and micro-interactions

Accessibility and responsive optimization

Frontend integration with backend and AI APIs

⚙️ Backend --- Manish Kumar & Harsh Singh

Responsible for server-side architecture, APIs, database and application
logic.

Responsibilities

Node.js / Next.js backend

REST APIs / server actions

MongoDB database

Authentication and authorization

Farmer and officer roles

User, farm and crop management

Crop scan and diagnosis records

Risk assessment records

Weather data integration

Farmer reports

Officer verification

Advisory and alert management

Follow-up tracking

API validation and security

Frontend ↔ Backend integration

AI service integration

🤖 AI / ML --- Garima Agrawal & Rishika Chaudhary

Responsible for artificial intelligence and machine learning components.

Responsibilities

Crop disease detection

Pest identification

Image preprocessing

Computer vision pipeline

Model research and selection

Transfer learning / pretrained models

Model evaluation

Confidence estimation

Disease severity estimation

Weather-based disease risk analysis

Crop-stage risk analysis

Regional risk intelligence

AI inference API

Model optimization

Dataset and model-performance research

AI Pipeline

Crop Image
     ↓
Image Preprocessing
     ↓
Disease / Pest Detection
     ↓
Confidence Score
     ↓
Severity Estimation
     ↓
Weather Context
     ↓
Crop Context
     ↓
Location / Regional Data
     ↓
Risk Assessment
     ↓
Farmer Advisory

📊 PPT / Presentation --- Vaishali Sharma

Responsible for the complete SIH presentation and pitch material.

Responsibilities

Problem statement and impact

Proposed solution

Product workflow

System architecture diagrams

AI/ML workflow

Technology stack

Innovation and uniqueness

GIS / risk intelligence explanation

Farmer and officer journeys

Product screenshots and demo slides

Benefits and impact

Scalability

Future scope

Final SIH pitch preparation

🧩 Product Architecture

                    CropSense
                        │
          ┌─────────────┴─────────────┐
          │                           │
      Farmer App                Officer Portal
          │                           │
          └─────────────┬─────────────┘
                        │
                   Backend APIs
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       MongoDB       Weather       GIS Data
          │             │             │
          └─────────────┼─────────────┘
                        │
                    AI / ML
                        │
          ┌─────────────┼─────────────┐
          │             │             │
      Disease/Pest   Risk Engine   Advisory
       Detection

🚀 Core Features

Farmer Side

Crop image scanning

Disease and pest detection

Confidence score

Severity estimation

Weather intelligence

Crop risk prediction

Local risk information

GIS hotspot visualization

Multilingual advisory

Crop health history

Follow-up monitoring

Alerts and early warnings

AI agriculture assistant

Officer Side

Command center

Regional risk map

Disease/pest hotspots

Emerging threat monitoring

Farmer report review

AI diagnosis validation

Confirm / Reject / Needs Review workflow

Disease and pest analytics

Crop-wise trends

Regional trends

Alerts and early-warning monitoring

🛠️ Technology Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Lucide Icons

Motion / Framer Motion

Recharts

Backend

Node.js

Next.js API Routes / Server Actions

MongoDB

AI / ML

Python

FastAPI

PyTorch

OpenCV

YOLO / suitable pretrained vision models

GIS

Leaflet

OpenStreetMap

GeoJSON

🌱 Product Philosophy

We don't just detect disease.
We predict risk.
We map the threat.
We guide the farmer.
We help authorities respond early.

🎯 Team Objective

Build CropSense as a practical, scalable and visually impressive
software solution for early crop disease and pest management.

The complete cycle is:

DETECT
   ↓
UNDERSTAND
   ↓
PREDICT
   ↓
MAP
   ↓
ADVISE
   ↓
VERIFY
   ↓
LEARN

👥 Team

Frontend: Rahul Singh
Backend: Manish Kumar, Harsh Singh
PPT / Presentation: Vaishali Sharma
AI / ML: Garima Agrawal, Rishika Chaudhary
