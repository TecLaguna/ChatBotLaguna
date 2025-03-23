//   Card.jsx
//   
//  Componente que renderiza una tarjeta con información de las consultas, documentos y conversaciones.
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import React, {useState,useEffect} from 'react'
import {icons} from '../assets/icons.js';

const Card = ({ name,icon,amount,percentage,active,query}) => {
    const icono = icons[icon]
  return (
    <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden w-full h-full p-2 text-[20px] font-[500] text-[#012970]'>
        <div className='p-4'>
          <h5 className='text-lg font-semibold' >
            {name} <span className='text-gray-500'>| All</span>
          </h5>
          <div className='flex items-center mt-3'>
            <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
              <img src={icono} alt='icon' />
            </div>
            <div className='ml-3'>
              {
                name === 'Top Consults'
                  ? <h6 className='text-sm font-bold'>{query}</h6>
                :
                
                <>
                  <h6 className='text-xl font-semibold'> 

                    {
                      amount.toLocaleString('en-US') 
                    }
                    
                  </h6>
                  <p className='text-sm'>
                    <span className={percentage > 0 ? 'text-success' : 'text-danger'}>
                      <i className={active ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></i>
                      {
                        percentage != null ? (
                          <>
                            {percentage}% <span className='text-gray-500 text-xs'>this month</span>
                          </>
                        ) : null
                      }

                      
                    </span>
                  </p>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
