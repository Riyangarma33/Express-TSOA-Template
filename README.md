# Express-TSOA-Template

API Template Based on Express Js and Typescript

You can select the branch based on package manager. It supports npm, yarn classic, and pnpm respective to repository branch.

## Depedencies

To install depedencies, you just need to run the install command.

* yarn

  ```bash
  $ yarn install
  ```
* npm

  ```bash
  $ npm install
  ```

To install the production dependencies (in case you want to deploy the API), you need to add extra parameter.

* yarn

  ```bash
  $ yarn install --production
  ```
* npm

  ```bash
  $ npm install --production
  $ # or
  $ NODE_ENV=production npm install
  ```

## Development

To run the API for development, you can run the `dev` script or use two terminals and run `dev:generate` and `dev:server`.

* yarn

  ```bash
  $ yarn dev
  ```
* npm

  ```bash
  $ npm run dev
  ```
