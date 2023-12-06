import Navbar from '../components/Navbar';
import IMG from '../assets/login_img.png';
import Footer from '../components/footer';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let userId = 0
    let userNombre = ""
    let userEmail = ""
    let userPassword = ""

    const request = {
        email: email,
        password: password,
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8080/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const responseData = await response.json();
                userId = responseData.data.id
                userNombre = responseData.data.nombre
                userEmail = responseData.data.email
                userPassword = responseData.data.password
                console.log(responseData);
                if(responseData.status_code == 200) {
                    window.location.href = `/home?id=${userId}&nombre=${userNombre}&email=${userEmail}&password=${userPassword}`
                } else if (responseData.status_code == 404){
                    alert("Usuario no existente")
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
                    <img className="w-full" src={IMG} alt="Login image" />
                </div>
                <div className="w-1/2 flex flex-col">
                    <div className="flex flex-col items-center mt-20">
                        <h1 className="text-3xl font-bold">¡Hola de nuevo!</h1>
                        <form onSubmit={handleLogin} className="flex flex-col items-center">
                            <input onChange={(e) => setEmail(e.target.value)} className="mt-3 px-5 py-3" name="email" type='email' placeholder='Ingresa tu correo' />
                            <input onChange={(e) => setPassword(e.target.value)} className="mt-3 px-5 py-3" name="password" type='password' placeholder='Ingresa tu contraseña' />
                            <button className="bg-cyan-500 py-2 rounded mt-5 w-full" type='submit'>Iniciar sesión</button>
                        </form>
                        <div className="flex flex-row mt-10 justify-end">
                            <h1 className="mr-3 font-semibold">¿No eres miembro aún? </h1><a className="text-cyan-500 font-bold hover:underline" href="/register">Registrarme</a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Login;
