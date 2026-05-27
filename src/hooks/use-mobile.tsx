import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Sử dụng addEventListener thay vì addListener cho trình duyệt hiện đại
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches); // Cập nhật đúng trạng thái ban đầu

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}