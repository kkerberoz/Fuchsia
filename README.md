# Fuchsia

CPE326 Final Project

### Development with Docker

1. Install docker (https://www.docker.com/)

2. Run

```bash
docker-compose docker-compose build
```

This will create images for our client and server.

3. Run

```bash
docker-compose docker-compose up -d
```

This will host our images inside a docker container. After this step you should be able to access the client development server on http://localhost:8080/ and nodemon server for service side development on http://localhost:5000/.
