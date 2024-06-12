import Link from "next/link"
import React from "react"
import CountUpCom from "./CountUpCom"

interface IDashBoardCardProps {
  href: string

  value: number
  id: string
  title: string
}

const DashBoardCard = ({
  href,

  value,
  id,
  title,
}: IDashBoardCardProps) => {
  return (
    <Link href={href} className="space-y-10 rounded-2xl bg-white p-4">
      <div className="w-full p-2">
        <h1 className="text-center text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flexCenter w-full text-2xl font-semibold">
        <CountUpCom id={id} value={value} duration={5} />
      </div>
    </Link>
  )
}

export default DashBoardCard
