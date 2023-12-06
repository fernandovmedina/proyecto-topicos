import Navbar from '../components/Navbar'
import IMG from '../assets/register_img.png'
import Footer from '../components/footer'
import { useState } from 'react'

const Register = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const request = {
        nombre: nombre,
        email: email,
        password: password,
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8080/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                if(responseData.status_code == 201) {
                    window.location.href = "/home"
                } else {
                    alert("Hubo un error al crear el usuario")
                }
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
            <section className="flex flex-row w-full px-40 pt-10">
                <div className="w-1/2">
                    <img className="w-full h-full" src={IMG} alt="Login image" />
                </div>
                <div className="w-1/2 flex flex-col">
                    <div className="flex flex-col items-center mt-20">
                        <h1 className="text-3xl font-bold">Bienvenido</h1>
                        <form onSubmit={handleRegister} className="flex flex-col items-center">
                            <input className="mt-3 px-5 py-3" name="nombre" type='text' placeholder='Ingresa tu nombre' onChange={(e) => setNombre(e.target.value)} />
                            <input className="mt-3 px-5 py-3" name="email" type='email' placeholder='Ingresa tu correo' onChange={(e) => setEmail(e.target.value)} />
                            <input className="mt-3 px-5 py-3" name="password" type='password' placeholder='Ingresa tu contraseña' onChange={(e) => setPassword(e.target.value)} />
                            <button className="bg-cyan-500 py-2 rounded mt-5 w-full" type='submit'>Registrarme</button>
                        </form>
                        <div className="flex flex-row mt-10 justify-end">
                            <h1 className="mr-3 font-semibold">¿Ya tienes una cuenta? </h1><a className="text-cyan-500 font-bold hover:underline" href="/login">Iniciar sesion</a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default Register;
