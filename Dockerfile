FROM node:24-alpine

WORKDIR /app

COPY package*.json tsconfig.json vite.config.ts index.html ./
COPY src/ ./src/
COPY tests/ ./tests/
COPY benchmarks/ ./benchmarks/

RUN npm install --ignore-scripts || true

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
