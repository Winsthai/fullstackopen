### Recap/Topics covered:
- Following the typical structure of an Express project
- Using router objects to separate routes into different controllers:
  > "A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router."
- Creating custom middlewares in Express and using them to adjust request/response objects
- Testing the backend using node:test
  - Using supertest package to test HTTP requests
- Storing references across collections by using Mongoose schema object IDs, a reference, and the "populate" function
- Generating password hashes using the bcrypt package
- Token based authentication using JSON web tokens
