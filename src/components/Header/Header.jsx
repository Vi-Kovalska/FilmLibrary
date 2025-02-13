import React, { Children } from 'react'
import s from './Header.module.css'
const Header = ({children}) => {
    return (
        <header>
            <div className={s.containerHeader}>{children}</div>
        </header>
      
  )
}

export default Header