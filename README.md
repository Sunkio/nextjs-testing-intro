# Introduction to Next.js Testing
This repository contains some code-along and "play around" code for the [Introduction to Testing in Next.js](https://www.youtube.com/watch?v=AS79oJ3Fcf0) tutorial by Dave Gray.
The topic is primarily how to set-up testing in a Next.js/Typescript project, plus some very basic testing. 

## Table of Contents
- [Set up testing](#set-up-testing-for-your-project)
- [Writing tests](#writing-tests)
- [Issues I ran into](#issues-i-ran-into-when-writing-my-first-tests)
- [Resources](#resources)

## Set up testing for your project
1. Create a new next.js project if you haven't already:
``` bash
  npx create-next-app@latest
```
2. Install the necessary development dependencies
``` bash 
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom ts-jest
```
3. Add the following to the scripts in `package.json` (be aware though that you might encounter some inconsistencies with the `--watchAll` flag):
```JSON
  {
   "scripts": {
        "test": "jest",
        "test:watch": "jest --watchAll"
    }
  }
  ```
  - `npm test` will run Jest once, executing all your tests.
  - npm run test:watch will run Jest in watch mode. Jest will continuously watch for file changes and re-run tests related to the changed files. This is handy when you're actively developing, as it provides rapid feedback about the state of your tests as you make changes to your codebase.
  - Using watch mode during development can significantly speed up your testing workflow because you don't have to manually re-run your test suite every time you make a change. Instead, Jest will automatically detect file changes and re-run the relevant tests, helping you catch issues and regressions quickly.


4. Create a jest.config.js file at your project's root
   - Next.js docs for testing: https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library
   - for the jest.config.mjs => make sure to change it to `jest.config.js` and change the import and export statements to `require` and `module.exports` (see this project's `jest-config.js` for reference)
   - other than that, just copy/paste the code from there
   - Optional: Absolute Imports and Module Path Aliases

      If your project is using Module Path Aliases, you will need to configure Jest to resolve the imports by matching the paths option in the jsconfig.json file with the moduleNameMapper option in the jest.config.js file. For example:

    ``` tsconfig.json or jsconfig.json
    {
      "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
        "baseUrl": "./",
        "paths": {
          "@/components/*": ["components/*"]
        }
      }
    }
    ```
    ```jest.config.js

    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/components/$1',
    }
    ```


5. Create a `jest.setup.js` file
   - copy/paste the code from this repo's file

6. If you use Eslint:
   - run: `npm i -D eslint-plugin-jest-dom eslint-plugin-testing-library`
   - then add the rest of the code from this project's `.eslintrc.json` to the file. Make sure to turn it into an array!

## Writing tests
1. Create a `__tests__` directory at the root of your project
2. Create test suites:
  - example: `Home.test.tsx` lets you test the index page
    - If you run into the issue that `if` and `expect` are not recognized, role `jest-dom` back to version `5.16.5`:
      ``` bash
      npm i -D @testing-library/jest-dom@5.16.5
      ```

## Issues I ran into when writing my first tests
### Why I couldn't use "not" for my test case
What Chat-GPT thinks about this:
The reason the not modifier didn't work in your initial code is related to how the toBeInTheDocument matcher and the not.toBeInTheDocument expectation function in @testing-library/react behave.

When you use expect(myElem).not.toBeInTheDocument(), you are essentially checking if the element (myElem) is not present in the document. However, the not.toBeInTheDocument() matcher provided by @testing-library/react doesn't directly check for the absence of an element. Instead, it checks if the element is removed from the document's accessibility tree, which is essentially a tree structure representing the elements and their relationships.

In your case, when you used screen.getByRole('heading', { name: 'Deploy' }) and the element with the text "Deploy" was not found, it did not exist in the accessibility tree, and the matcher not.toBeInTheDocument() was intended to be used when an element was expected to be removed or not present in the accessibility tree.

However, you wanted to check for the absence of a specific text string in the document, not necessarily whether an element with a specific accessibility role and name was present or not. That's why using screen.queryByText('Deploy') and checking if the result is null is a more suitable approach for your case, as it directly checks for the presence or absence of the text you're interested in, without relying on the accessibility tree.

In summary, the not.toBeInTheDocument() matcher is designed for more complex accessibility tree checks and may not be the most appropriate choice when you want to directly verify the absence of specific text or elements in the document. Using screen.queryByText and checking for null is a simpler and more direct approach for your use case.


## Resources
- Next.js docs for testing: https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library
  - this is for the Pages Router. Testing doesn't exist in the App Router docs (yet)
- Testing Library: https://testing-library.com/docs 
- For further reading on improving React Testing Library tests: https://claritydev.net/blog/improving-react-testing-library-tests