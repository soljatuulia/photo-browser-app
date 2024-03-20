# :camera: Photo Browser App

Photo Browser is a simple web app for, that's right, browsing photos. It fetches JSON formatted data about the photos and the related users and albums from the backend at [http://jsonplaceholder.typicode.com/](http://jsonplaceholder.typicode.com/) and displays them to the user in a few different views.

## :sparkles: Features

The application includes the following views:

- All Photos: Displays thumbnails of all photos with pagination, with search field.
- Single Photo: Displays the title, full-sized photo, and links to view the album in which the photo is located and the user page which displays all albums from the user.
- Album: Displays the album name and thumbnails of photos in the album with pagination and search field.
- User Info: Displays the total number of user's albums & photos, and a preview of three photos from each album with the album name included.

## :point_up: Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Mantine](https://mantine.dev/) UI  component library
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint

## :computer: Prerequisites

Before you begin, make sure:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).
- You have the latest version of Chrome, as that is the browser the app's designed for.

## :runner: Running the Application

1. Clone the repository.
2. First run `npm install` to install dependencies, then `npm run dev` to start the development server.
3. Access the application in your web browser at http://localhost:3000.

## :mag: Running tests

This project uses Jest for testing. To run the tests, follow these steps:

1. Ensure you have installed all the project dependencies: `npm install`.
2. Run the tests `npm run test`. This will run the Prettier code formatter, ESLint, TypeScript type checking, and Jest tests. 
3. If you want to run only the Jest tests, you can use `npm run jest`. To run Jest in watch mode, which will automatically re-run tests when files change, use `npm run jest:watch`.

## :dancers: Live Version

A live version of the application can be found [here](https://soljatuulia.github.io/photo-browser-app/).

## :crystal_ball: TODO

Given more time, I would definitely improve the following:

- Improve the UX/UI. I decided to not spend too much time on the design, and the project does not showcase my abilities with e.g. CSS.
- Implement proper testing. As of now, the test coverage is very minimal. My goal was to incorporate a handful of tests.
- Improve error handling.
- Migrate from Next.js pages router to app router. I am more familiar with the pages router and did not want to risk losing time to study the app router.
