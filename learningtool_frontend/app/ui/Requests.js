import Link from 'next/link'
import React from 'react'

const Requests = () => {
  return (
    <div>
        <h1>Requests</h1>
        <Link href={"/pages/user/search"}>Search A Friend</Link>
    </div>
  )
}

export default Requests