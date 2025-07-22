# FinFLOW: Personal Finance Toolkit

FinFLOW is a comprehensive personal finance web application designed to help users manage, plan, and optimize their finances. It offers a suite of financial calculators, planning tools, and a vibrant community platform for sharing knowledge and experiences.

## Features

- **Financial Calculators:**
  - SIP Calculator
  - Compound Interest Calculator
  - Loan EMI Calculator
  - Lump Sum Calculator
  - Emergency Fund Calculator
  - Net Worth Calculator
  - Tax Calculator
  - Savings Goal Calculator
  - Investment Comparison Calculator
  - Rent vs Buy Calculator
  - Currency Converter
- **Budget Planning:**
  - Interactive budget planner to track income and expenses
- **Community Platform:**
  - Forums, Q&A, Groups, Events, Challenges, Stories, and Resources
  - Community-driven challenges and feedback
- **Modern UI:**
  - Responsive design with Tailwind CSS
  - Modular React components

## Directory Structure

```
finance/
├── zynance/                # Main app source
│   ├── src/
│   │   ├── components/     # React components (calculators, community, UI)
│   │   ├── assets/         # Static assets
│   │   ├── lib/            # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── public/             # Public assets
│   ├── index.html          # HTML template
│   └── ...                 # Config and meta files
└── package.json            # Project metadata
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd finance/zynance
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (default Vite port)

## Usage

- Access a variety of financial calculators from the main dashboard.
- Plan your budget and track your net worth.
- Join the community to participate in forums, challenges, and events.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please follow the code style and include tests where appropriate.
