import heroData from "../../data/hero.json";

export default function Footer() {
  return (
    <footer className="text-center p-6 bg-blue-600 text-gray-200">
      <p>© {new Date().getFullYear()} · {heroData.fullName} · {heroData.title}</p>
    </footer>
  );
}
