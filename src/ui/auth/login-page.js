
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../api/auth';
import Popup from '../common/popup';

export default function LoginPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [modal, setModal] = useState({});

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  
  const handleLogin = () => {    
    //e.preventDefault();
    
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validatePassword = (pass) => {
      return String(pass)
        .match(
          /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        );
    };

    // Validate form
    let error = '';
    
    if (!validateEmail(form.email))
      error = "El correo electrónico ingresado no es válido. Por favor verifique que el correo electrónico sea válido.";

    if (!validatePassword(form.password))
      error = 'La contraseña ingresada no es válida. La contraseña debe contener al menos una letra mayúscula, ' +
              'una letra minúscula y un número o un caracter especial.';

    if (!form.password || form.password === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Contraseña'.";

    if (!form.email || form.email === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Correo eléctronico'.";

    if (error !== '') {
      setModal({ 
        show: true, title: 'Error', message: error,
        onAccept: () => setModal({show: false })
      });
      setForm({ ...form, password: '' });
      return;
    }

    setModal({
      title: 'Ingresando ...',
      message: 'Por favor espere mientras se validan sus datos',
      show: true,
      isLoading: true,
    });      

    fetch('https://hnjmr-j3fs.onrender.com/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',  
        'Allow-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (data.statusCode && data.statusCode === 401) {
        setModal({
          title: 'Error al ingresar',
          message: 'Correo electrónico o contraseña incorrectos', 
          show: true,
          onAccept: () => { setModal({show: false}) }
        });
        return;
      }

      if (data.statusCode && data.statusCode !== 200) {
        setModal({
          title: 'Error interno',
          message: 'Ha ocurrido un error inesperado', 
          show: true,
          onAccept: () => { setModal({show: false}) }
        });
        return;
      }

      // load user in sesion storage

      fetch('https://hnjmr-j3fs.onrender.com/api/auth/info-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        },
      })
      .then(res => res.json())
      .then(user => {

        if (user.statusCode && user.statusCode === 401) {
          setModal({
            title: 'Acceso denegado',
            message: 'Esta cuenta de usuario se encuentra deshabilitada. Contacte con el administrador del sistema',
            show: true,
            onAccept: () => { setModal({show: false}) }
          });
          return;
        }

        if (user.isActive && user.isActive === false) {
          setModal({
            title: 'Usuario deshabilitado',
            message: 'Esta cuenta de usuario se encuentra actualmente deshabilitada. Contacte con el administrador del sistema', 
            show: true,
            onAccept: () => { setModal({show: false}) }
          });
          setForm({ ...form, password: '' });
          return;
        }
        user.user.token = data.token;
        setUser(user);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setModal({
          title: 'Error interno',
          message: 'Ha ocurrido un error inesperado', 
          show: true,
          onAccept: () => { setModal({show: false}) }
        });
      });
    }).catch(err => {
      setModal({
        title: 'Error de conexión',
        message: 'No se ha podido establecer conexión con el servidor. Intente nuevamente más tarde', 
        show: true,
        onAccept: () => { setModal({show: false}) }
      });
    });
  }

  return (
    <div className="flex justify-center items-center w-full h-full bg-light-1 dark:bg-dark-1">
      <div className="flex flex-row w-[66%] xl:w-[58%] 2xl:w-[55%] h-[550px] rounded-lg bg-white dark:bg-dark-2
                      shadow-lg">

        <Popup 
          title={modal.title}
          message={modal.message}
          show={modal.show}
          onAccept={modal.onAccept}
          isLoading={modal.isLoading}
        />

        {/* Left side */}
        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full rounded-l-lg 
                        bg-avila bg-cover bg-center contrast-125 brightness-110">
          
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 lg:rounded-l-none h-full rounded-lg">
          <div className="flex flex-col justify-start w-full h-full px-28 lg:px-10 py-2">
            <h1 className="font-light mt-14 my-12 place-self-center text-4xl text-black dark:text-white">Iniciar sesión</h1>
            
            {/* Form */}
            <div className="flex flex-col space-y-6">

              {/* Row 1 */}
              <div className="flex flex-row h-fit w-full space-x-6">          
                {/* email */}
                <div className="flex flex-col h-full w-full justify-end">                
                  <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                    <label className="text-left font-medium text-lg text-gray-800 dark:text-gray-200">Correo electrónico</label>
                    <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">en mínusculas</label>
                  </div>
                  <input 
                    name="email"
                    className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                              bg-light-1 dark:bg-dark-3 text-black dark:text-white  "
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>              
              </div>

              {/* Row 2 */}
              <div className="flex flex-row h-fit w-full space-x-6">          
                {/* password */}
                <div className="flex flex-col h-full w-full justify-end" >                
                  <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                    <label className="text-left font-medium text-lg text-gray-800 dark:text-gray-200">Contraseña</label>
                    <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">clave privada</label>
                  </div>
                  <input 
                    name="password"
                    type="password"
                    className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                              bg-light-1 dark:bg-dark-3 text-black dark:text-white  "
                    value={form.password}
                    
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key.includes('Enter')) {handleLogin()} }}
                  />
                </div>              
              </div>    

              <div className="flex flex-col w-content h-fit justify-center items-center space-y-2">
                <button 
                  className="flex flex-row justify-center items-center w-full h-12 rounded-full 
                             bg-gradient-to-r from-cream-1 to-cream-2 text-white
                             hover:bg-gradient-to-tr"
                  onClick={handleLogin}
                  
                >
                  Ingresar
                </button>
                <a href="/signup" className="text-sm text-gray-700 dark:text-gray-300 hover:text-cream-1">
                  ¿No tiene una cuenta? Regístrese
                </a>

              </div>
            </div>
            
            
          </div>
        </div>

      </div>
          
    </div>
  );
}   