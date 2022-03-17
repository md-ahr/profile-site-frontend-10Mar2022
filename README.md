# Project - Personal Profile

## What is the use of this Repo

This Project is a Typescript, Node JS and ReactJS Project which demonstrates the following
1. Creating server using express js
2. Connect the server with mongodb database
3. Creating rest api endpoints
4. Creating component in react
5. Making HTTP calls
6. Communicating between components, using context api
7. Using tailwind css, toastify and react modal library for UI interations
8. For client side routing, using react router v6
9. Image uploading on cloudinary server

## Live Application URL

### https://mern-job-profiler.herokuapp.com
This URL has the application deployed in

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```
## Live Application URL

The Application is deployed in https://mern-job-profiler.herokuapp.com

Click on the link to see the application

## Cloning and Running the Application in local

Clone the project into local

## Running backend server

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application, type the following command

```bash
npm run serve
```

For build the project, type the following command

```bash
npm run build
```

## Running frontend server

Install all the npm packages. Go into the project folder `/frontend` and type the following command to install all npm packages

```bash
npm install
```

In order to run the application, type the following command

```bash
npm run start
```

For build the project, type the following command

```bash
npm run build
```

The Application Runs on **localhost:3000**

## Set Environment Variables

**PORT**, **API_PREFIX**, **NODE_ENV**, **JWT_SECRET**, **MONGODB_URI**, **CLOUD_NAME**, **API_KEY**, **API_SECRET**, **CLOUDINARY_URL**

## Application design

#### Pages

1. **Login**

2. **Signup**

3. **Home**

#### HTTP client

**axios** library is used to make HTTP Calls

#### URL

User Login - **/login**

User Signup - **/signup**

Home Page - **/profile/:id**

The application has just one url /customerlist which ties to *Customers* Component

## Resources

**create-react-app** : The following link has all the commands that can be used with create-react-app
https://github.com/facebook/create-react-app

**ReactJS** : Refer to https://reactjs.org/ to understand the concepts of ReactJS

**Typescript** : Refer to https://www.typescriptlang.org/ to understand the concepts of Typescript

**Express JS** : Refer to https://www.expressjs.com/ to understand the concepts of Express JS

**Mongoose** : Refer to https://www.mongoosejs.com/ to understand the concepts of Mongoose
