import { useEffect, useRef, useState } from "react";

// Tracks whether an element is near the viewport so off-screen
// WebGL canvases can stop rendering and free up the main thread.
const useInView = (rootMargin = "200px") => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
};

export default useInView;
