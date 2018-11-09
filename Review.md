# Review Questions

## What is Node.js?
Node js is a runtime environment. Which allows us to use javascript applications outside of the browser.

## What is Express?
Express is framework that helps us organize our web application for the server/database through setup requests, routes, and middleware.

## Mention two parts of Express that you learned about this week.

## What is Middleware?
Middleware is pretty much an array of functions that are called in the order they are introduced to the server code.

## What is a Resource?
A resource is the item being pointed at by the URL. So if I wanted the person with the id 1, it would be localhost:9000/users/1 but if I want all users it would be localhost:9000/users.

## What can the API return to help clients know if a request was successful?
A response.

## How can we partition our application into sub-applications?
You can create sub applications by breaking pieces up similar to how you create middleware and using the 'use' function from express to mount it in the main app.

## What is express.json() and why do we need it?
Express.json is pretty much bodyparser.json where it tells your application to recognize the request as a json object. It is also important because it helps us find the intended route and CRUD function.