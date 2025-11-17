import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', in_stock: true })
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/products`)
      const data = await res.json()
      setProducts(data)
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
      const body = { ...form, price: form.price ? Number(form.price) : 0 }
      const res = await fetch(`${baseUrl}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      setForm({ title: '', description: '', price: '', category: '', in_stock: true })
      load()
    } catch (e) {
      setError(String(e))
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Add Product</h3>
          <form onSubmit={submit} className="space-y-3">
            <Input label="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
            <Input label="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
            <Input label="Price" type="number" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} />
            <Input label="Category" value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} />
            <div className="flex items-center gap-2 text-blue-200">
              <input id="stock" type="checkbox" checked={form.in_stock} onChange={(e)=>setForm({...form, in_stock:e.target.checked})} />
              <label htmlFor="stock">In stock</label>
            </div>
            {error && <p className="text-red-300 text-sm">{error}</p>}
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2 transition-colors">Create</button>
          </form>
        </div>
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Products</h3>
          {loading ? (
            <p className="text-blue-200">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-blue-200">No products yet.</p>
          ) : (
            <ul className="divide-y divide-blue-500/10">
              {products.map(p => (
                <li key={p.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{p.title}</p>
                      <p className="text-blue-300 text-sm">{p.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${p.price}</p>
                      <span className={`text-xs px-2 py-1 rounded border ${p.in_stock ? 'border-green-400/40 text-green-300 bg-green-400/10' : 'border-gray-400/40 text-gray-300 bg-gray-400/10'}`}>{p.in_stock ? 'In stock' : 'Out of stock'}</span>
                    </div>
                  </div>
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
