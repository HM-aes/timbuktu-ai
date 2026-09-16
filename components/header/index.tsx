import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-background/85 backdrop-blur-md">
      <Navbar />
    </header>
  );
}
