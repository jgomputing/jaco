export default function Header() {
  return (
    <header className="w-full py-4 px-8 shadow-md">
      <nav>
        <ul className="flex gap-4">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          <li><a href="/about" className="hover:text-blue-600">About</a></li>
          <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
} 