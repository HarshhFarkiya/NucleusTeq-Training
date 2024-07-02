import React from 'react'
import styles from "./ProgressBar.module.scss"
export default function ProgressBar({url}) {
  return (
    <div className={styles.box}>
    <div className={styles.content}>
      <div className={styles.percent} style={{backgroundImage:`Url(${url})`, backgroundRepeat:"no-repeat" ,backgroundPosition:"center"}}>
        <div className={styles.dot}></div>
        <svg>
          <circle cx="45" cy="45" r="30"></circle>
          <circle cx="45" cy="45" r="40"></circle>
        </svg>
      </div>
    </div>
  </div>
  )
}
