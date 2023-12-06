import Whatsapp from "../assets/whatsapp.png";
import Messenger from "../assets/messenger.png";
import Cliente from "../assets/atencion_al_cliente.png";
import Facebook from "../assets/facebook.png";
import Twitter from "../assets/twitter.png";
import Instagram from "../assets/instagram.png";
import LinkedIN from "../assets/linked_in.png";
import Youtube from "../assets/youtube.png";
import Ask from "../assets/ask.png";
import Master from "../assets/master.png";
import Paypal from "../assets/paypal.svg";
import Visa from "../assets/visa.png"
import Icon1 from "../assets/icon_1.avif"
import Icon2 from "../assets/icon_2.avif"
import Icon3 from "../assets/icon_3.avif"
import Icon4 from "../assets/icon_4.avif"
import Icon5 from "../assets/icon_5.avif"
import Icon6 from "../assets/icon_6.avif"

const Footer = () => {
  return (
    <footer className="mt-1">
      <div className="w-full h-full flex flex-row bg-blue-950 text-white">
        <div className="w-1/3">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl mt-5">¿Necesitas ayuda?</h1>
            <a
              href="#"
              className="flex flex-row items-center bg-cyan-500 px-12 my-5 py-3 rounded"
            >
              <img className="w-5 mx-3" src={Ask} alt="Centro de Ayuda Icon" />
              Centro de ayuda
            </a>
          </div>
          <div className="flex my-3 px-24">
            <h1 className="text-left text-sm">Escríbenos</h1>
          </div>
          <div className="flex flex-row px-24">
            <img className="w-7 mr-5" src={Whatsapp} alt="Whatsapp" />
            <img className="w-7 mr-5" src={Messenger} alt="Messenger" />
            <img
              className="w-7 mr-5"
              src={Cliente}
              alt="Atencion al cliente"
            />
          </div>
          <h1 className="px-24 my-5">Síguenos en</h1>
          <div className="flex flex-row px-24 pb-10">
            <img className="w-7 mr-5" src={Facebook} alt="Facebook" />
            <img className="w-7 mr-5" src={Twitter} alt="Twitter" />
            <img className="w-7 mr-5" src={Instagram} alt="Instagram" />
            <img className="w-7 mr-5" src={LinkedIN} alt="Linked in" />
            <img className="w-7 mr-5" src={Youtube} alt="Youtube" />
          </div>
        </div>
        <div className="w-1/3 flex-row">
          <div className="flex flex-col mt-5">
            <div className="flex flex-row pb-3 items-center">
              <h1 className="text-3xl font-bold mr-5">Aceptamos</h1>
              <img className="w-10 h-5 mr-1" src={Paypal} alt="Paypal" />
              <img className="w-10 h-6 mr-1" src={Master} alt="Mastercard" />
              <img className="w-10 h-4 mr-1" src={Visa} alt="Visa" />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col mr-10">
              <h1 className="font-bold text-[16px]">Sobre</h1>
              <h1 className="font-bold text-[16px]">Aerotec</h1>
              <p className="text-[12px]">Inversionistas</p>
              <p className="text-[12px]">Alianzas comerciales</p>
              <p className="text-[12px]">Compliance</p>
              <p className="text-[12px]">Codigo de conducta</p>
              <p className="text-[12px]">Corporativo aeroméxico</p>
              <p className="text-[12px]">Private jets</p>
              <p className="text-[12px]">Sostenibilidad</p>
            </div>
            <div className="flex flex-col mr-10">
              <h1 className="font-bold text-[16px]">De tu interés</h1>
              <p className="text-[12px]">Ultimas noticias</p>
              <p className="text-[12px]">Blog de viajes</p>
              <p className="text-[12px]">Formas de pago</p>
              <p className="text-[12px]">Nuestra flota</p>
              <p className="text-[12px]">Tiendas de viaje</p>
              <p className="text-[12px]">Aerotec bussines</p>
              <p className="text-[12px]">Sala de prensa</p>
            </div>
            <div className="flex flex-col mr-10">
              <h1 className="font-bold text-[16px]">Contacto</h1>
              <p className="text-[12px]">Centro de ayuda</p>
              <p className="text-[12px]">Comentario/Queja</p>
              <p className="text-[12px]">Linea Ética</p>
            </div>
          </div>
        </div>
        <div className="w-1/3">
            <h1 className="font-bold text-3xl mt-5 mb-3">¿Tienes un vuelo?</h1>
            <div className="flex flex-col">
                <div className="flex flex-row mb-2">
                    <img className="w-5 mr-4" src={Icon1} alt="icon" />
                    <h4 className="text-sm">Facturacion</h4>
                </div>
                <div className="flex flex-row mb-2">
                    <img className="w-5 mr-4" src={Icon2} alt="icon" />
                    <h4 className="text-sm">Tu equipaje</h4>
                </div>
                <div className="flex flex-row mb-2">
                    <img className="w-5 mr-4" src={Icon3} alt="icon" />
                    <h4 className="text-sm">Servicios especiales</h4>
                </div>
                <div className="flex flex-row mb-2">
                    <img className="w-5 mr-4" src={Icon4} alt="icon" />
                    <h4 className="text-sm">Cambia tu vuelo</h4>
                </div>
                <div className="flex flex-row mb-2">
                    <img className="w-5 mr-4" src={Icon5} alt="icon" />
                    <h4 className="text-sm">Reembolsos</h4>
                </div>
                <div className="flex flex-row mb-2">
                    <img className="w-5 mr-4" src={Icon6} alt="icon" />
                    <h4 className="text-sm">Guía para tu viaje</h4>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
