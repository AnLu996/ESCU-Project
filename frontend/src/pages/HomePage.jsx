import { Link } from 'react-router-dom'

function HomePage() {
  const posts = [
    { id: 1, content: 'Hoy me siento triste 😞' },
    { id: 2, content: 'Recuerda que eres fuerte 💪' },
    { id: 3, content: 'Alguien necesita hablar?' },
  ]

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-blue-800 shadow text-white">
        <h1 className="text-3xl font-bold">🌟 Muro Anónimo</h1>
        <Link to="/login">
          <button className="bg-white text-blue-800 px-5 py-2 rounded-lg hover:bg-gray-100 transition duration-300">
            Iniciar sesión
          </button>
        </Link>
      </header>

      {/* Main content centrado */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <p className="text-gray-700 text-lg">{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomePage