import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import SIM from '../assets/sim.png'
import Visa from '../assets/visa.png'
import { getEmail } from '../functions/functions'

const NewPago = () => {
    const [nombre, setNombre] = useState("")
    const [tarjeta, setTarjeta] = useState("")
    const [expiracion, setExpiracion] = useState("")
    const [cvv, setCVV] = useState("")

    const email = getEmail()

    const handlePago = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8080/api/new_pago?email=${email}&numero=${tarjeta}&expiracion=${expiracion}&cvv=${cvv}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                console.error("Error en la solicitud de inicio de sesión:", response.statusText);
            }
        } catch (error) {
            console.error("Error en la solicitud de inicio de sesión", error);
        }
    };

    return (
        <main>
            <Navbar />
            <div className='w-full h-full flex flex-row'>
                <div className="w-1/2 h-full flex items-center justify-center py-10">
                    <div className='bg-cyan-600 w-[500px] h-[250px] rounded-lg'>
                        <div className='flex justify-end px-5 py-5'>
                            <img className="w-14" src={Visa} />
                        </div>
                        <div className='px-5 mt-5'>
                            <img className="w-16" src={SIM} />
                        </div>
                        <div className='px-7'>
                            <h1 className='text-white text-xl'>{nombre}</h1>
                        </div>
                        <div className='px-7'>
                            <h1 className='text-white text-lg my-2'>{tarjeta}</h1>
                        </div>
                        <div className='ml-2 w-full flex flex-row justify-end text-white text-sm'>
                            <h1 className="mx-5">{expiracion}</h1>
                            <h1 className="mx-5">{cvv}</h1>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col py-10">
                    <form onSubmit={handlePago} className="w-full h-full flex flex-col">
                        <h1 className="text-3xl font-extrabold mb-2">Detalles de pago</h1>
                        <h3 className="text-xl font-semibold">Nombre</h3>
                        <input className='px-6 mb-5 py-2 w-[50%]' type="text" placeholder="Ingresa el nombre del dueño" onChange={(e) =>setNombre(e.target.value)} />
                        <h3 className="text-xl font-semibold">Numero de tarjeta</h3>
                        <input className='px-6 mb-5 py-2 w-[50%]' type="text" name="numero" placeholder='Ingresa tu numero de tarjeta' onChange={(e) => setTarjeta(e.target.value)} />
                        <div className="w-full flex flex-row">
                            <div className='w-1/2 h-full'>
                                <h3 className="text-xl font-semibold">Expiracion</h3>
                                <input className='px-6 mb-5 py-2 w-[50%]' type="text" name="expiracion" placeholder='Ingresa la fecha de expiracion' onChange={(e) => setExpiracion(e.target.value)} />
                            </div>
                            <div className='w-1/2 h-full'>
                                <h3 className="text-xl font-semibold">CVV</h3>
                                <input className='px-6 mb-5 py-2 w-[50%]' type="text" name="cvv" placeholder='Ingresa tu CVV' onChange={(e) => setCVV(e.target.value)} />
                            </div>
                        </div>
                        <button className="bg-cyan-500 w-[35%] py-2 px-3 rounded-lg hover:bg-cyan-900" type='submit'>Añadir pago</button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default NewPago;
