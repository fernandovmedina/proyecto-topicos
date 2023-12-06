import Logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <nav className="bg-blue-950 w-full h-full px-10 py-2 flex flex-row">
            <div className="w-2/12">
                <a className="flex flex-row items-center" href="/"><img src={Logo} alt="Logo AEROTEC" />
                <h1 className='text-white ml-5 font-bold text-xl'>A E R O T E C</h1></a>
            </div>
            <div className="w-7/12 flex flex-row items-center justify-evenly text-white">
                <a className="font-bold text-sm hover:bg-cyan-500 hover:rounded py-2 px-4" href="/reservacion">Reserva</a>
                <a className="font-bold text-sm hover:bg-cyan-500 hover:rounded py-2 px-4" href="/rastrear">Rastrear vuelo</a>
                <a className="font-bold text-sm hover:bg-cyan-500 hover:rounded py-2 px-4" href="/vuelos_disponibles">Vuelos disponibles</a>
            </div>
            <div className="w-3/12 flex flex-row justify-evenly items-center text-white">
                <a className="font-bold text-sm hover:bg-cyan-500 hover:rounded py-2 px-4" href="/login">Iniciar sesion</a>
                <a className="font-bold text-sm rounded bg-cyan-500 py-2 px-4 hover:bg-cyan-800" href="/register">Registrarme</a>
            </div>
        </nav>
    )
}

export default Navbar;
