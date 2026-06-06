export default function HeroSmoke() {
  return (
    <div className="hero-smoke pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-smoke__layer hero-smoke__layer--1" />
      <div className="hero-smoke__layer hero-smoke__layer--2" />
      <div className="hero-smoke__layer hero-smoke__layer--3" />
      <div className="hero-smoke__layer hero-smoke__layer--4" />
      <div className="hero-smoke__layer hero-smoke__layer--5" />
    </div>
  );
}
