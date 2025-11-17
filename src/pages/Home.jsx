export default function Home() {
  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <img src="/flame-icon.svg" alt="Flames" className="w-20 h-20 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Flames Blue</h1>
          <p className="text-xl text-blue-200 mb-6">Build applications through conversation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Users" href="/users" desc="Create and list users stored in MongoDB." />
          <Card title="Products" href="/products" desc="Add products and browse the catalog." />
          <Card title="Health" href="/health" desc="Check backend and database connectivity." />
        </div>
      </div>
    </div>
  )
}

function Card({ title, desc, href }) {
  return (
    <a href={href} className="block bg-slate-800/60 border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/40 hover:bg-slate-800/80 transition-colors">
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-blue-200/80 text-sm">{desc}</p>
    </a>
  )
}
