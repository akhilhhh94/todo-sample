FROM node:14.17.6
WORKDIR /app
COPY ["backend/package.json", "backend/package-lock.json*", "./backend/"]
RUN npm install
COPY /backend .
CMD ["npm", "start"]
