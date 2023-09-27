

`npx create-next-app@latest`
`npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom ts-jest`

Add the following to the scripts in `package.json` (be aware though that you might encounter some inconsistencies with the `--watchAll` flag):
```JSON
    "scripts": {
        "test": "jest",
        "test": "watchAll"
    },
```

- Next.js docs for testing: https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library
  - for the jest.config.mjs => make sure to change it to `jest.config.js` and change the import and export statements to `require` and `module.exports` (see this project's `jest-config.js` for reference)
  - just copy/paste the code from there
- `jest.setup.js`
- add sth. to `.eslintrc.json`, run: `npm i -D eslint-plugin-jest-dom eslint-plugin-testing-library`
  Then add the rest of the code from this project's `.eslintrc.json` to the file. Make sure to turn it into an array.
## Resources
- Next.js docs for testing: https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library
  - this is for the Pages Router. Testing doesn't exist in the App Router docs (yet)
- 