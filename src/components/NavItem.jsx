//   NavbarItem.jsx
//   
//  Descripción:
//   Componente que renderiza un item de la barra de navegación
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

const NavItem = ({ nav }) => {
  return (
    <li className="nav-item">
            <a href="#" className="nav-link collapsed">
            <i className={nav.icon}></i>
            <span>{nav.name}</span>
        </a>
    </li>
  )
}

export default NavItem