FROM node:18-slim
WORKDIR /app
RUN npm init -y && npm install express
COPY . .
RUN mkdir -p priv
EXPOSE 3000
CMD ["node", "index.js"]