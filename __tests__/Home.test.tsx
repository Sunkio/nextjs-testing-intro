import {render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Triple A: Arrange, Act, Assert


describe('Home', () => {
    it('should have Docs text', () => {
        render(<Home />) // ARRANGE

        const myElem = screen.getByText('Docs') // ACT

        expect(myElem).toBeInTheDocument() // ASSERT
    })

    it('should contain the text "information"', () => {
        render(<Home />) // ARRANGE

        const myElem = screen.getByText(/information/i) // ACT

        expect(myElem).toBeInTheDocument() // ASSERT
    })

    it('should have a heading that says "Learn"', () => {
        render(<Home />) // ARRANGE

        const myElem = screen.getByRole('heading', {
            name: 'Learn'
        }) // ACT

        expect(myElem).toBeInTheDocument() // ASSERT
    })

    it('should not have a heading that says "Deploy"', () => {
        render(<Home />) // ARRANGE

        const myElem = screen.queryByText('Deploy') // ACT

        expect(myElem).toBeNull() // ASSERT
    })
})
