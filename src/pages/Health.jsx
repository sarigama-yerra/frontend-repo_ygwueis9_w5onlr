import { useEffect, useState } from 'react'

export default function Health() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/health`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        setData({ error: String(e) })
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-white text-2xl font-semibold mb-4">System Health</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Panel title="Backend">
          {loading ? (
            <p className="text-blue-200">Checking...</p>
          ) : data?.error ? (
            <p className="text-red-300">{data.error}</p>
          ) : (
            <ul className="text-blue-200 space-y-1">
              <li><span className="text-white">Status:</span> {data.backend}</li>
              <li><span className="text-white">DB:</span> {data.database}</li>
              <li><span className="text-white">DB URL:</span> {data.database_url}</li>
              <li><span className="text-white">DB Name:</span> {data.database_name}</li>
              <li><span className="text-white">Connection:</span> {data.connection_status}</li>
            </ul>
          )}
        </Panel>
        <Panel title="Collections">
          {loading ? (
            <p className="text-blue-200">Loading...</p>
          ) : data?.collections?.length ? (
            <div className="flex flex-wrap gap-2">
              {data.collections.map((c) => (
                <span key={c} className="px-2 py-1 rounded bg-blue-600/20 text-blue-200 border border-blue-400/30 text-xs">{c}</span>
              ))}
            </div>
          ) : (
            <p className="text-blue-200">No collections found</p>
          )}
        </Panel>
      </div>
    </section>
  )
}

function Panel({ title, children }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      {children}
    </div>
  )
}
