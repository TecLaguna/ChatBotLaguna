//   Home.jsx
//   
//  Descripción:
//   Página principal de la aplicación, contiene el Navbar, SideBar y Main
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Main from './Main.jsx'
import SideBar from '../components/SideBar.jsx'
const Home = () => {
  return (
    <div>
        <Navbar />
        <SideBar />
        <Main style={{ marginLeft: '250px' }}  />
    </div>
  )
}

export default Home