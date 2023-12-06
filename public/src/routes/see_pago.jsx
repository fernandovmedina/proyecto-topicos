import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import SIM from '../assets/sim.png'
import Visa from '../assets/visa.png'
import { getEmail } from '../functions/functions'
import { useState, useEffect } from 'react'

const SeePago = () => {
    const [data, setData] = useState(null)

    const email = getEmail()

    useEffect(() => {
        let isFetchDataCalled = false;

        const fetchData = async () => {
            if (isFetchDataCalled) {
                return;
            }

            isFetchDataCalled = true;

            try {
                const request = await fetch(`http://127.0.0.1:8080/api/pago?email=${email}`);
                const response = await request.json();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(data, email)

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
                            <h1 className='text-white text-xl'>{data && data.email}</h1>
                        </div>
                        <div className='px-7'>
                            <h1 className='text-white text-lg my-2'>{data && data.numero}</h1>
                        </div>
                        <div className='ml-2 w-full flex flex-row justify-end text-white text-sm'>
                            <h1 className="mx-5">{data && data.expiracion}</h1>
                            <h1 className="mx-5">{data && data.cvv}</h1>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex flex-col py-10">
                    <form className="w-full h-full flex flex-col">
                        <h1 className="text-3xl font-extrabold mb-2">Detalles de pago</h1>
                        <h3 className="text-xl font-semibold">Email</h3>
                        <input className='px-6 mb-5 py-2 w-[50%]' type="text" value={data && data.email} />
                        <h3 className="text-xl font-semibold">Numero de tarjeta</h3>
                        <input className='px-6 mb-5 py-2 w-[50%]' type="text" name="numero" value={data && data.numero} />
                        <div className="w-full flex flex-row">
                            <div className='w-1/2 h-full'>
                                <h3 className="text-xl font-semibold">Expiracion</h3>
                                <input className='px-6 mb-5 py-2 w-[50%]' type="text" name="expiracion" value={data && data.expiracion} />
                            </div>
                            <div className='w-1/2 h-full'>
                                <h3 className="text-xl font-semibold">CVV</h3>
                                <input className='px-6 mb-5 py-2 w-[50%]' type="text" name="cvv" value={data && data.cvv} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default SeePago;
