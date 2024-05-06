import React, { useState } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
const Loading = () => {
const [isloading, setIsloading] = useState(true)
  return (
    <BeatLoader
        loading={isloading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Loading