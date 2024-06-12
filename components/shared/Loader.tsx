"use client"
import { GridLoader } from "react-spinners"
const Loader = ({ size }: { size?: number }) => {
  return <GridLoader color="blue" size={size} />
}

export default Loader
