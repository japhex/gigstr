import { useEffect, useState, RefObject } from 'react'

type IntersectionObserverInit = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const useInView = <T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = {},
  defaultView = false
) => {
  const [isInView, setIsInView] = useState(defaultView)

  useEffect(() => {
    const currentRef = ref?.current as Element
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)
    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return isInView
}

export default useInView
