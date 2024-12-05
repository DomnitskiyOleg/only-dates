import { useState, useEffect } from 'react'

export default function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1010)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1010)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}
