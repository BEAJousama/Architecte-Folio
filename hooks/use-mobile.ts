import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Set initial value inside effect, but wrapped in a microtask or just initialize state with it if possible.
    // Since we can't initialize with window in SSR, doing it in useEffect is standard, 
    // but the linter complains about sync setState. Wait for next tick.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Initial setup
    const updateSize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    updateSize();

    mql.addEventListener("change", updateSize)
    return () => mql.removeEventListener("change", updateSize)
  }, [])

  return !!isMobile
}
