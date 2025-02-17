import React from 'react'
import s from './Footer.module.css'
const Footer
 = () => {
  return (
      <div className={s.footerContainer}>
<h2 className={s.titleFooter}>Cooperation and proposals:</h2>
          <address >
              <ul className={s.adressList}>
                  <li>
                      Email: <a className={s.contactsLink} href='https://mail.google.com/mail/u/0/#inbox'>kovalskayavi853@gmail.com</a>  
                  </li>
                  <li>
                      GitHub: <a className={s.contactsLink} href='https://github.com/Vi-Kovalska'>Vi-Kovalska</a>  
                  </li>
              </ul>
</address>
    </div>
  )
}

export default Footer
