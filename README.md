# :camera: Photo Browser App

Photo Browser is a simple web app for, that's right, browsing photos. It fetches JSON formatted data about the photos and the related users and albums from the backend at [http://jsonplaceholder.typicode.com/](http://jsonplaceholder.typicode.com/).

## :sparkles: Features

The application includes the following views:

- All Photos: Displays thumbnails of all photos with pagination.
- Single Photo: Displays the title, full-sized photo, and links to view the album in which the photo is located and the user page which displays all albums from the user.
- Album: Displays the album name and thumbnails of photos in the album with pagination.
- User Info: Displays the number of albums, number of photos, and a preview of three photos from each album with the album name included.

## :point_up: Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Mantine](https://mantine.dev/) UI  component library
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint

## :computer: Prerequisites

The application works on the latest version of Chrome.

## :runner: Running the Application

1. Open a terminal in the root directory of the project.
2. First run `npm install`, then `npm start`.
3. Access the application in your web browser at http://localhost:3000.

## :mag: Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

## :dancers: Live Version

A live version of the application can be found [here](tbd).

## :crystal_ball: TODO

Given more time, I would definitely improve the following:

- Improve the UX/UI. I decided to not spend too much time on the design, and the project does not showcase my abilities with e.g. CSS
- Enhance test coverage. As of now, all critical paths and edge cases are not thoroughly tested.
- Improve error handling.
