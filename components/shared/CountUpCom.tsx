"use client"
import { CountUp } from "countup.js"
import { useEffect } from "react"

interface ICountUpProps {
  id: string
  value: number
  duration?: number
}

const CountUpCom = ({ id, value, duration }: ICountUpProps) => {
  useEffect(() => {
    const count = new CountUp(id, value, {
      duration: duration || 1.5,
    })
    count.start()
  }, [id, value])
  return <p id={id} />
}

export default CountUpCom
