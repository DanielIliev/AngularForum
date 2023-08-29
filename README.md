# Angular forum application
    Simple forum application with user authentication and authorizations
    Authentication and authorizations are performed with JWT / Bearer token approach
    Hosted with Vercel: https://angular-forum-danieliliev.vercel.app/
    Server source: https://github.com/DanielIliev/AngularForumServer
    Disclaimer: The initial load time for the data in the application is ~30 seconds,
    which is the time required for the server to start.

## Functionalities
    Guest
        - Access to the homepage
        - View all posts on the board
        - View post details and their related comments
        - Login to profile
        - Register a new unique profile

    User
        - Access to the homepage
        - View all posts on the board
        - View post details and their related comments
        - Create new posts
        - Comment on any post
        - Edit or delete a post (if they are the author)
        - Access to profile page

## Tech stack
    Angular
    Bootstrap
    Bootstrap Icons

## Third-party services used
    Vercel as the hosting solution for the front-end
    Render as the hosting solution for the back-end
    MongoDB Atlas as the database
