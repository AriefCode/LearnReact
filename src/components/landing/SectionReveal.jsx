import useInView from "../../hooks/useInView";

export default function SectionReveal({ children, className = "" }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`reveal-fade-up ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
