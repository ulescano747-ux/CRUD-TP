const express = require('express')
const app = express()

app.use(express.json())

const productos = [
  { id: 1, nombre: 'Café con leche', precio: 1800, categoria: 'bebida' },
  { id: 2, nombre: 'Medialuna', precio: 900, categoria: 'comida' },
  { id: 3, nombre: 'Tostado de jamón y queso', precio: 3500, categoria: 'comida' },
  { id: 4, nombre: 'Agua mineral', precio: 1200, categoria: 'bebida' }
]

function validarProducto(req, res) {
  const { nombre, precio } = req.body || {}
  if (typeof nombre !== 'string' || !nombre.trim() || typeof precio !== 'number' || precio <= 0) {
    res.status(400).json({ error: 'El nombre es obligatorio y el precio debe ser un número mayor que cero.' })
    return false
  }
  return true
}

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la Cafetería del CRUI')
})

app.get('/api/productos', (req, res) => {
  res.status(200).json(productos)
})

app.get('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id))
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' })
  res.status(200).json(producto)
})

app.post('/api/productos', (req, res) => {
  if (!validarProducto(req, res)) return
  const nuevo = {
    id: Math.max(0, ...productos.map(p => p.id)) + 1,
    nombre: req.body.nombre.trim(),
    precio: req.body.precio,
    categoria: typeof req.body.categoria === 'string' && req.body.categoria.trim() ? req.body.categoria.trim() : 'general'
  }
  productos.push(nuevo)
  res.status(201).json(nuevo)
})

app.put('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === Number(req.params.id))
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado.' })
  if (!validarProducto(req, res)) return
  producto.nombre = req.body.nombre.trim()
  producto.precio = req.body.precio
  if (typeof req.body.categoria === 'string' && req.body.categoria.trim()) {
    producto.categoria = req.body.categoria.trim()
  }
  res.status(200).json(producto)
})

app.delete('/api/productos/:id', (req, res) => {
  const indice = productos.findIndex(p => p.id === Number(req.params.id))
  if (indice === -1) return res.status(404).json({ error: 'Producto no encontrado.' })
  const eliminado = productos.splice(indice, 1)[0]
  res.status(200).json(eliminado)
})

app.use((err, req, res, next) => {
  const estado = err.status === 400 ? 400 : 500
  const mensaje = estado === 400 ? 'JSON inválido.' : 'Error interno del servidor.'
  res.status(estado).json({ error: mensaje })
})

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000')
})
