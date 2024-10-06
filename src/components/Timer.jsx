import React, { useEffect, useState } from 'react'

const Timer = ({ duration, onTimeUp }) => {
   const [timeLeft, setTimeLeft] = useState(duration)

   useEffect(() => {
      if (timeLeft > 0) {
         const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
         return () => clearTimeout(timerId)
      } else {
         onTimeUp()
      }
   }, [timeLeft, onTimeUp])
   return (
      <div>Waktu : {timeLeft} detik</div>
   )
}

export default Timer