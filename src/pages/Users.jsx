import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', address: '', age: '', is_active: true })
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/users`)
      const data = await res.json()
      setUsers(data)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const body = { ...form, age: form.age ? Number(form.age) : undefined }
      const res = await fetch(`${baseUrl}/api/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      setForm({ name: '', email: '', address: '', age: '', is_active: true })
      load()
    } catch (e) {
      setError(String(e))
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Add User</h3>
          <form onSubmit={submit} className="space-y-3">
            <Input label="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            <Input label="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            <Input label="Address" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} />
            <Input label="Age" type="number" value={form.age} onChange={(e)=>setForm({...form, age:e.target.value})} />
            <div className="flex items-center gap-2 text-blue-200">
              <input id="active" type="checkbox" checked={form.is_active} onChange={(e)=>setForm({...form, is_active:e.target.checked})} />
              <label htmlFor="active">Active</label>
            </div>
            {error && <p className="text-red-300 text-sm">{error}</p>}
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2 transition-colors">Create</button>
          </form>
        </div>
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Users</h3>
          {loading ? (
            <p className="text-blue-200">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-blue-200">No users yet.</p>
          ) : (
            <ul className="divide-y divide-blue-500/10">
              {users.map(u => (
                <li key={u.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{u.name}</p>
                    <p className="text-blue-300 text-sm">{u.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${u.is_active ? 'border-green-400/40 text-green-300 bg-green-400/10' : 'border-gray-400/40 text-gray-300 bg-gray-400/10'}`}>{u.is_active ? 'Active' : 'Inactive'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function Input({ label, type = 'text', value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-blue-200 text-sm">{label}</label>
      <input type={type} value={value} onChange={onChange} className="w-full bg-slate-900/60 border border-blue-500/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
    </div>
  )
}
