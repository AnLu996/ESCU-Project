import { Link } from 'react-router-dom'

function HomePage() {
  const posts = [
    { id: 1, content: 'Hoy me siento triste 😞' },
    { id: 2, content: 'Recuerda que eres fuerte 💪' },
    { id: 3, content: 'Alguien necesita hablar?' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-3xl font-bold text-blue-600">🌟 Muro Anónimo</h1>
        <Link to="/login">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Iniciar sesión
          </button>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto mt-10 space-y-6 px-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <p className="text-gray-700 text-lg">{post.content}</p>
          </div>
        ))}
      </main>
    </div>
  )
}

export default HomePage
