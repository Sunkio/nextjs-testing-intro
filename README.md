# Introduction to Next.js Testing

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

### Writing tests
- If you run into the issue that if and expect are not recognized, role jest-dom back to version 5.16.5:
  `npm i -D @testing-library/jest-dom@5.16.5`


## Why I couldn't use "not" for my test case
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