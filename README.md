# 🛍️ AI-Driven Market Basket Analysis (MBA) System

## Project Overview

This project implements a full-stack, predictive analytical system designed to empower retail managers with **actionable intelligence** derived from large transactional datasets. It transforms raw sales records into quantifiable association rules (using metrics like **Lift** and **Confidence**), delivered via an interactive dashboard and a real-time conversational chatbot.

The goal is to identify and visualize hidden purchasing patterns, specifically supporting strategic decisions related to **cross-selling, product bundling, and inventory optimization**.

---

## 🚀 Key Features

### Core Analytical Engine
* **Association Rule Mining:** Utilizes the industry-standard **Apriori Algorithm** (`mlxtend`) for efficient extraction of frequent itemsets and rule generation.
* **Actionability Metrics:** Filters and ranks rules based primarily on the **Lift Ratio** (Lift > 1.2) to identify non-obvious, high-value correlations.
* **Data Pipeline:** Employs an optimized Python backend using **Pandas** for efficient data cleaning and transformation into the necessary **one-hot encoded matrix** format.

### User Interface & Prediction
* **Interactive Dashboard (React):** A responsive web interface allowing users to upload transaction data (CSV input) and dynamically set analytical parameters (Min Support, Min Confidence).
* **Advanced Visualization:** Includes a **Lift vs. Confidence Scatter Plot** for holistic rule evaluation and a **Network Graph** to visually map strong product associations.
* **Predictive Chatbot:** A conversational assistant that allows users to query the rule base in plain language (e.g., "If a customer buys product X, what should I recommend?"), providing instant, quantified predictions.

---

## 🛠️ Technology Stack

This application is built as a three-tier architecture combining high-performance Python computing with modern web presentation.

| Layer | Technology | Primary Purpose |
| :--- | :--- | :--- |
| **Frontend (Presentation)** | **React** (JavaScript/TS) | Interactive dashboard, dynamic charting, and user interface. |
| **Backend (Application Logic)** | **Python (FastAPI)** | High-performance API gateway, handling HTTP requests and serving analysis results. |
| **Analytical Core** | **Pandas, `mlxtend`** | Data cleaning, matrix transformation, and execution of the Apriori algorithm. |
| **Data Contract** | **JSON** | Standardized data exchange format between the Python API and the React frontend. |

---

## ⚙️ Installation and Setup

### Prerequisites

You must have the following installed on your system:
* **Python 3.8+** (for the backend)
* **Node.js & npm** (for the frontend)

### 1. Backend Setup (FastAPI)

1.  Clone the repository:
    ```bash
    git clone [YOUR-REPO-URL]
    cd [YOUR-REPO-NAME]
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the FastAPI backend server:
    ```bash
    uvicorn app:app --reload
    ```
    *(The backend API will typically be available at `http://127.0.0.1:8000`)*

### 2. Frontend Setup (React)

1.  Navigate to the frontend directory (e.g., `cd frontend`).
2.  Install Node dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm run dev
    ```
    *(The web application will open in your browser, typically at `http://localhost:5173`)*

---

## 🤝 Contribution

This project is open-source and welcomes contributions, feature suggestions, and bug reports. Feel free to open an issue or submit a pull request!

---
## License

This project is licensed under the MIT License.
