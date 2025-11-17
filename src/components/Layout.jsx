import { Link, NavLink, Outlet } from 'react-router-dom'

function Navbar() {
  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
  const active = 'bg-blue-600 text-white'
  const inactive = 'text-blue-100 hover:bg-blue-600/20 hover:text-white'

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-blue-500/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <img src="/flame-icon.svg" alt="Flames" className="w-6 h-6" />
          <span>Flames Blue</span>
        </Link>
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}>
            Home
          </NavLink>
          <NavLink to="/users" className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}>
            Users
          </NavLink>
          <NavLink to="/products" className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}>
            Products
          </NavLink>
          <NavLink to="/health" className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}>
            Health
          </NavLink>
          <a href="/test" className={`${linkBase} ${inactive}`}>Legacy Test</a>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-500/10 bg-slate-900/60 text-blue-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm flex items-center justify-between">
        <p>Built with ❤️ by Flames Blue</p>
        <p className="opacity-70">Chat to build • Database connected</p>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(147,197,253,0.08),transparent_40%)]" />
      <Navbar />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
