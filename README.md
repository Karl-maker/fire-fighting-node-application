# Fire Backend Node.js Application

## Overview

This project is a Node.js-based application, designed to handle IoT device data. It leverages various tools and frameworks like TypeScript, Jest for testing, Docker for containerization, and more.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (version 22.x or higher)
- **pnpm** (a fast, disk space efficient package manager)
- **Docker** (for containerization)

If you don’t have these tools installed, follow the instructions below:

#### Install Node.js

1. Download and install Node.js from the [official website](https://nodejs.org/).
2. Verify the installation:
   ```bash
   node -v
   ```

#### Install pnpm

`pnpm` is a faster alternative to `npm` and `yarn`. Install it globally using the following command:

```bash
npm install -g pnpm
```

Verify the installation:

```bash
pnpm -v
```

#### Install Docker

1. Follow the installation instructions on the [Docker website](https://docs.docker.com/get-docker/).
2. Once installed, verify the installation:
   ```bash
   docker --version
   ```

### Cloning the Repository

To clone the project repository:

1. Use the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/[your-git-username]/fire-fighting-node-application.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fire-fighting-node-application
   ```

### Setting Up Environment Variables

Before running the project, you need to configure your environment variables. 

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Ensure that you **fill in all required variables** in the `.env` file. 

### Important Security Notice: Secrets Handling

**Never hardcode or push secrets to the repository**. It is extremely important to keep your secrets secure.

- Do not hardcode any sensitive information such as API keys, passwords, or tokens directly in the code or commit them to version control.
- Always use environment variables (stored in `.env`) to manage secrets safely.
- **Punishments will apply for exposing or pushing secrets** to the repository. This is to ensure the safety and security of the application, its users, and your team.

Please ensure that your `.env` file is excluded from version control by including `.env` in your `.gitignore` file.

---

### Running the Application

#### Run the Application Locally

After setting up your environment variables, you can run the application locally:

```bash
pnpm start
```

This will start the server on the port specified in `.env`.

#### Running the Application with Docker

To run the application using Docker, follow these steps:

1. **Build the Docker image:**
   In the root of the project directory, run:

   ```bash
   docker build -t project-name .
   ```

2. **Run the Docker container:**

   After building the Docker image, you can run it:

   ```bash
   docker run --env-file .env -p 3000:3000 fire-fighting-node-application

   ```

   This will run the app in a container, and the app will be accessible at `http://localhost:3000`.

#### Running the Application with Docker Compose

If you have a `docker-compose.yml` file for multi-container setups (e.g., if your application depends on a database), you can use Docker Compose to build and run the containers:

1. **Start the application with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   This will build and start all the services defined in `docker-compose.yml`.

### Running Tests

To run the tests, use `pnpm` with Jest:

```bash
pnpm test:unit && pnpm test:e2e
```

This will run the Jest test suite and output the results in your terminal.

### Linting and Formatting

We use ESLint and Prettier to maintain code quality. To lint and format the code, run the following command:

```bash
pnpm lint
```

This will check for any linting issues and automatically fix format issues where possible.

### Building the Project

To create a production-ready build of the project, use:

```bash
pnpm build
```

This will transpile the TypeScript code and prepare the application for deployment.

### Additional Notes

- **Docker Volumes**: If you need persistent data storage, you can add volumes in your Docker setup. 
- **CI/CD**: This project is designed to integrate with CI/CD pipelines (e.g., GitHub Actions, GitLab CI). You can configure your pipeline to install dependencies and run tests using the `pnpm install` and `pnpm test:unit && pnpm test:e2e` commands.

---

## Contact & Support

If you need help or have any questions, feel free to reach out to **Cenedex** or **Karl** directly at the following email:

- **Cenedex Support**: [support@cenedex.com](mailto:support@cenedex.com)
- **Karl-Johan Bailey**: [karl@cenedex.com](mailto:karl@cenedex.com)

We are happy to assist with any issues or questions regarding the setup and usage of the application.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add your feature'`.
5. Push to your forked repository: `git push origin feature/your-feature`.
6. Create a pull request to the `development` branch.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
