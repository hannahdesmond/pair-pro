import React from 'react'
import Header from '../Header'


import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter, UNSAFE_RouteContext } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';

test('header renders with logout if user logged in', () => {
    render(
    <AuthContextProvider value={}>
      <MemoryRouter> 
        <Header />
      </MemoryRouter>
    </AuthContextProvider>
    
    const headerEl = screen.getByTestId("nav");

    expect(headerEl.textContent).toBe("PairPro Login Register")   
})