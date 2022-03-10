import React from 'react'
import Header from '../Header'


import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from 'react-router-dom';

test('header renders with correct text', () => {
    render(
   
    <Header />, {wrapper: MemoryRouter});
  
    const headerEl = screen.getByTestId("nav");

    expect(headerEl.textContent).toBe("PairPro Login Register")   
})