# iAmReady - Connecting Recruiters with Job Seekers

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Draw.io](https://img.shields.io/badge/Draw.io-F08705?style=for-the-badge&logo=draw.io&logoColor=white)

iAmReady is a website that helps recruiters efficiently match with job seekers. Recruiters can visit the website, search for candidates that fit their requirements, and directly contact them, saving time in going through numerous CVs.

## Table of Contents
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Data Modeling](#data-modeling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- Recruiters can search for job seekers based on various criteria (skills, experience, location, etc.)
- Job seekers can create profiles and showcase their skills and experience
- Recruiters can directly contact job seekers through the platform
- Secure and seamless user authentication and authorization

## Installation and Setup
To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/iAmReady.git`
2. Install the required dependencies for the frontend (React.js) and backend (Flask):
   - Frontend: `cd frontend && npm install`
   - Backend: `pip install -r requirements.txt`
3. Set up the PostgreSQL database:
   - Create a new database
   - Update the database connection details in the backend configuration
4. Start the development servers:
   - Frontend: `cd frontend/i_am_ready/ && npm start`
   - Backend: `python3 -m api.v1.app`

## Usage
Once the development servers are running, you can access the website at `http://localhost:3000`. The main features include:

- Recruiters can search for job seekers and view their profiles
- Job seekers can create and update their profiles
- Recruiters can contact job seekers directly through the platform

## API Documentation
The API documentation for the backend is available at `/swagger` (e.g., `http://localhost:5000/swagger`). This documentation is generated using Swagger UI and provides detailed information about the available endpoints, request/response schemas, and authentication requirements.

## Data Modeling
The data model for the iAmReady project is designed using Draw.io. You can find the data model diagram in the `docs/data-model.png` file.

## Contributing
Contributions to the iAmReady project are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and ensure the code is properly tested
4. Submit a pull request with a detailed description of your changes

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
If you have any questions or feedback, please feel free to contact the project maintainers:

- Salau Isiaka Olakunle (Project Lead) - olakunleisiaq50@gmail.com
- Salau Isiaka Olakunle (Developer) - olakunleisiaq50@gmail.com
