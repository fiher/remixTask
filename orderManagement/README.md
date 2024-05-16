# Order Management App

This app uses NodeJS, Express, MySQL and Docker

To run - `docker compose up`

# Design Choices
- Not using Typescript even though I am more comfortable with it, because Remix doesnt have it added in its tech stack
- Used `UserManagement` service minimally inside `middlewares/orderValidator` to validate the `userId`
- Simple API defined in `orderRouter`
  - GET /getOrderByUserId
  - POST /create
  - GET /getOrderByOrderId
- Used a very simple single table defined in `/database/database`
- Utilising `axios` for accessing `userManagement`
- Using `express-validator` for the validation which is then used as a middleware
- Handling of errors via middleware defined in `app.js`

# Considerations

Because of the limited time for this and the PHP project I have made some decisions to save on time

It took me a while to make an app with MySQL and not using typescript as I am more familiar with different setups,
however it should be okay as it is. I have not added tests because of time constraint, however the code should be easily testable
I have added optional passable parameters to `OrderRepository` and `OrderService` which would make mocking and passing them very easy.

I have opted to use classes for `OrderRepository` and `OrderService` as this is my preferred approach, however I have also used functions for `orderController` in case
functional programming is preferred at Remix.

# Future Improvements

If it were a production project I would have added tests with JEST, authentication with JWT tokens, Kubernetes setup, in which
I would make sure to have all other services linked with ingress for fast communication in the same cluster.



