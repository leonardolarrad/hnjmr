// Create help page

import React from 'react';
import img1 from '../assets/help/1.png';
import img2 from '../assets/help/2.png';
import img3 from '../assets/help/3.png';
import img4 from '../assets/help/4.png';
import img5 from '../assets/help/5.png';
import img6 from '../assets/help/6.png';
import img7 from '../assets/help/7.png';
import img8 from '../assets/help/8.png';
import img9 from '../assets/help/9.png';
import img10 from '../assets/help/10.png';
import img11 from '../assets/help/11.png';
import img12 from '../assets/help/12.png';
import img13 from '../assets/help/13.png';
import img14 from '../assets/help/14.png';
import img15 from '../assets/help/15.png';
import img16 from '../assets/help/16.png';
import img17 from '../assets/help/17.png';
import img18 from '../assets/help/18.png';
import img19 from '../assets/help/19.png';
import img20 from '../assets/help/20.png';
import img21 from '../assets/help/21.png';
import img22 from '../assets/help/22.png';
import img23 from '../assets/help/23.png';

export default function HelpPage() {

    // make index of help topics
    // at right side of page, show index of topics

    const topics = [
        { href: '#crear-lote', title: 'Cómo registrar un lote de insumos' },
        { href: '#actualizar-insumo', title: 'Cómo actualizar un registro de un lote de insumos' },
        { href: '#eliminar-insumo', title: 'Cómo eliminar un registro de un lote de insumos' },
        { href: '#buscar-insumo', title: 'Buscar un insumo por su material o fecha de despacho' },
        { href: '#reporte-insumo', title: 'Imprimir reporte de lotes de insumos (PDF)' },
        { href: '#crear-activo', title: 'Cómo registrar un activo' },
        { href: '#actualizar-activo', title: 'Cómo actualizar un registro activo' },
        { href: '#eliminar-activo', title: 'Cómo eliminar un registro de activo' },
        { href: '#buscar-activo', title: 'Buscar un activo por su nombre, número o torre' },
        { href: '#reporte-activo', title: 'Imprimir reporte de activos (PDF)' },
        { href: '#deshabilitar-usuario', title: 'Deshabilitar un usuario' },
        { href: '#hacer-admin', title: 'Otorgar permisos de administrador a un usuario' },
        { href: '#acerca-de-usuario', title: 'Consultar permisos de la cuenta' },
        { href: '#cambiar-tema', title: 'Cómo cambiar tema' },
        { href: '#codigo-fuente', title: 'Código fuente' },
        { href: '#licencia', title: 'Licencia de uso' },
    ]

    return (
        <div className="flex flex-row w-full h-full justify-between space-x-2 p-2">
            <div className="flex flex-col w-full h-full space-y-8 p-2 overflow-y-auto">
                
                {/* #crear-lote */}
                <div id="crear-lote" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Cómo registrar un lote de insumos</h1>
                    <p className="text-lg">
                        Para registrar un nuevo lote de insumos médicos dirigase a la sección de <b>Insumos médicos</b> en el menú de navegación.
                        Una vez en la vista de insumos presione el botón <b>Crear nuevo</b> en la parte superior derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img3} alt="cambiar tema" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Esto lo llevará a un formulario en donde deberá llenar los campos con la información del lote de insumos requeridos.
                        Una vez llenados los campos presione el botón <b>Guardar</b> en la parte inferior central de la pantalla.
                    </p>
                    <br/>
                    <img src={img4} alt="cambiar tema" className="w-fit h-fit"/>
                </div>
                
                {/* #actualizar-insumo */}
                <div id="actualizar-insumo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Cómo actualizar un registro de un lote de insumos</h1>
                    <p className="text-lg">
                        Para actualizar un lote de insumos dirigase a la sección de <b>Insumos médicos</b> en el menú de navegación.
                        Una vez en la vista de insumos posicione su cursor en el lote que desee actualizar y presione el icono de <b>Lapiz</b> en la parte derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img5} alt="Actualziar lote de insumos" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Esto lo llevará a un formulario en donde deberá llenar los campos con la información del lote de insumos requeridos.
                        Una vez llenados los campos presione el botón <b>Guardar</b> en la parte inferior central de la pantalla.
                    </p>
                    <br/>
                    <img src={img6} alt="cambiar tema" className="w-fit h-fit"/>
                </div>

                {/* #eliminar-insumo */}
                <div id="eliminar-insumo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold ">Cómo eliminar un registro de un lote de insumos</h1>
                    <h4 className="text-md font-bold mb-4 text-cream-1">* Esta acción solo está disponible para administradores</h4>
                    <p className="text-lg">
                        Para eliminar un lote de insumos dirigase a la sección de <b>Insumos médicos</b> en el menú de navegación.
                        Una vez en la vista de insumos posicione su cursor en el lote que desee eliminar y presione el icono de <b>Basura</b> en la parte derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img11} alt="Eliminar lote de insumos" className="w-fit h-fit"/>
                    <br/>
                    <p> 
                        Se le pedirá confirmación para eliminar el lote de insumos, presione <b>Eliminar</b> para confirmar.
                    </p>
                </div>

                {/* #buscar-insumo */}
                <div id="buscar-insumo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Buscar un lote de insumos por su material o fecha de despacho</h1>
                    <p className="text-lg">
                        Para buscar un lote de insumos dirigase a la sección de <b>Insumos médicos</b> en el menú de navegación.
                        Una vez en la vista de insumos seleccione el cuadro de búsqueda en la parte superior central de la pantalla
                        y escriba el nombre, número o torre del lote de insumos que desea buscar.
                    </p>
                    <br/>
                    <img src={img7} alt="Buscar lote de insumos" className="w-fit h-fit"/>
                </div>

                {/* #reporte-insumo */}
                <div id="reporte-insumo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Imprimir reporte de lotes de insumos (PDF)</h1>
                    <p className="text-lg">
                        Para generar un reporte de insumos dirigase a la sección de <b>Insumos médicos</b> en el menú de navegación.
                        Una vez en la vista de insumos presione el botón <b>Reporte</b> en la parte superior derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img8} alt="Generar reporte de insumos" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Esto lo llevará a un formulario en donde, de manera opcional, podrá rellenar parametros que filtraran los resultados
                        generados por el reporte.
                    </p>
                    <br/>
                    <img src={img9} alt="Generar reporte de insumos" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Una vez llenados los campos presione el botón <b>Generar</b> en la parte inferior central de la pantalla.
                        Esto le generará un reporte en PDF que podrá previsualizar y posteriormente guardar en su equipo. 
                    </p>
                    <br/>
                    <img src={img10} alt="Generar reporte de insumos" className="w-fit h-fit"/>
                </div>

                {/* #crear-activo */}
                <div id="crear-activo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Cómo registrar un activo</h1>
                    <p className="text-lg">
                        Para crear un activo dirigase a la sección de <b>Bienes y activos</b> en el menú de navegación.
                        Una vez en la vista de activos presione el botón <b>Crear nuevo</b> en la parte superior derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img12} alt="Crear activo" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Esto lo llevará a un formulario en donde deberá llenar los campos con la información del activo requeridos.
                        Una vez llenados los campos presione el botón <b>Guardar</b> en la parte inferior central de la pantalla.
                    </p>
                    <br/>
                    <img src={img13} alt="Crear activo" className="w-fit h-fit"/>
                </div>

                {/* #actualizar-activo */}
                <div id="actualizar-activo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Cómo actualizar un registro de activo</h1>
                    <p className="text-lg">
                        Para actualizar un activo dirigase a la sección de <b>Bienes y activos</b> en el menú de navegación.
                        Una vez en la vista de activos posicione su cursor en el activo que desee actualizar y presione el icono de <b>Lapiz</b> en la parte derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img14} alt="Actualizar activo" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Esto lo llevará a un formulario en donde deberá actualizar los campos con la información del activo requeridos.
                        Una vez actualizados los campos presione el botón <b>Guardar</b> en la parte inferior central de la pantalla.
                    </p>
                    <br/>
                    <img src={img15} alt="Actualizar activo" className="w-fit h-fit"/>
                </div>

                {/* #eliminar-activo */}
                <div id="eliminar-activo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold">Cómo eliminar un registro de activo</h1>
                    <h4 className="text-md font-bold mb-4 text-cream-1">* Esta acción solo está disponible para administradores</h4>
                    <p className="text-lg">
                        Para eliminar un activo dirigase a la sección de <b>Bienes y activos</b> en el menú de navegación.
                        Una vez en la vista de activos posicione su cursor en el activo que desee eliminar y presione el icono de <b>Basura</b> en la parte derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img20} alt="Eliminar activo" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Esto le pedirá confirmación para eliminar el activo. Una vez confirmado el proceso el activo será eliminado.
                    </p>
                </div>

                {/* #buscar-activo */}
                <div id="buscar-activo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Buscar un activo por su nombre, número o torre</h1>
                    <p className="text-lg">
                        Para buscar un activo dirigase a la sección de <b>Bienes y activos</b> en el menú de navegación.
                        Una vez en la vista de activos seleccione el campo de búsqueda en la parte superior central de la pantalla y escriba 
                        el nombre, el número o la torre/habitación que utiliza el activo para buscarlo
                    </p>
                    <br/>
                    <img src={img16} alt="Buscar activo" className="w-fit h-fit"/>
                </div>

                {/* #reporte-activo */}
                <div id="reporte-activo" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Imprimir reporte de activos (PDF)</h1>
                    <p className="text-lg">
                        Para generar un reporte de activos dirigase a la sección de <b>Bienes y activos</b> en el menú de navegación.
                        Una vez en la vista de activos presione el botón <b>Reporte</b> en la parte superior derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img17} alt="Generar reporte de activos" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Esto le llevará a un formulario opcional donde podrá parametrizar el reporte. 
                        Una vez parametrizado el reporte presione el botón <b>Generar</b> en la parte inferior central de la pantalla.
                    </p>
                    <br/>
                    <img src={img18} alt="Generar reporte de activos" className="w-fit h-fit"/>
                    <br/>
                    <p className="text-lg">
                        Una vez generado el reporte podrá previsualizarlo y descargarlo en su computadora.
                    </p>
                </div>

                {/* #deshabilitar-usuario */}
                <div id="deshabilitar-usuario" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold ">Deshabilitar un usuario</h1>
                    <h4 className="text-md font-bold mb-4 text-cream-1">* Esta acción solo está disponible para administradores</h4>
                    <p className="text-lg">
                        Para deshabilitar un usuario dirigase a la sección de <b>Usuarios</b> en el menú de navegación.
                        Una vez en la vista de usuarios posicione su cursor en el usuario que desee deshabilitar y presione el icono de <b>Desactivar</b> en la parte derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img23} alt="Deshabilitar usuario" className="w-fit h-fit"/>
                </div>

                {/* #hacer-admin */}
                <div id="hacer-admin" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold ">Otorgar permisos de administrador a un usuario</h1>
                    <h4 className="text-md font-bold mb-4 text-cream-1">* Esta acción solo está disponible para administradores</h4>
                    <p className="text-lg">
                        Para otorgar permisos de administrador a un usuario dirigase a la sección de <b>Usuarios</b> en el menú de navegación.
                        Una vez en la vista de usuarios posicione su cursor en el usuario que desee otorgar permisos de administrador y presione el icono de <b>Asignar admin</b> en la parte derecha de la pantalla.
                    </p>
                    <br/>
                    <img src={img22} alt="Otorgar permisos de administrador a un usuario" className="w-fit h-fit"/>
                </div>

                {/* #acerca-de-usuario */}
                <div id="acerca-de-usuario" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold ">Consultar permisos de la cuenta</h1>
                    <p className="text-lg">
                        Para consultar los permisos de la cuenta dirigase a la sección de <b>Configuración</b> en el menú de navegación.
                        Una vez en la vista de configuración podrá ver los permisos de la cuenta en la parte inferior de la pantalla en
                        el campo <b>Rol</b>.
                    </p>
                    <br/>
                    <img src={img21} alt="Consultar permisos de la cuenta" className="w-fit h-fit"/>
                </div>
 
                {/* Como cambiar tema */}
                <div id="cambiar-tema" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Cómo cambiar tema</h1>
                    <p className="text-lg">
                        Ciertos usuarios pueden preferir trabajar con un tema oscuro para reducir la fatiga visual. 
                        Para cambiar el tema, haga clic en el botón de la esquina superior derecha de la pantalla, concretamente
                        el icono de la luna o el sol. Esto le permitirá cambiar el tema de la aplicación.
                    </p>
                    <br/>
                    <img src={img1} alt="cambiar tema" className="w-fit h-fit"/>
                    <br/>
                    <img src={img2} alt="cambiar tema" className="w-fit h-fit"/>
                </div>

                {/* Código fuente */}
                <div id="codigo-fuente" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Código fuente</h1>
                    <p className="text-lg">
                        El código fuente, en su totalidad, está disponible en Github. 
                        Se puede descargar y modificar según sea necesario. Incluye documentación para la instalación y uso. 
                        El proyecto se dividió en dos partes: el servidor y el cliente. 
                    </p>
                    <br/>
                    <p className="text-lg">
                        El servidor está desarrollado en NodeJS utilizando NestJS y su repositorio se encuentra en 
                    </p> 
                    <a href="https://github.com/ChristianSanchez25/hnjmr-server" target="_blank" className="text-blue-500 hover:text-blue-700">
                        https://github.com/ChristianSanchez25/hnjmr-server
                    </a>
                    <br/>
                    <p className="text-lg">
                        El cliente está desarrollado en ReactJS y su repositorio se encuentra en
                    </p>
                    <a href="https://github.com/leonardolarrad/hnjmr" target="_blank" className="text-blue-500 hover:text-blue-700">
                        https://github.com/leonardolarrad/hnjmr
                    </a>    
                </div>

                {/* Licencia */}
                <div id="licencia" className="flex flex-col w-full h-fit dark:text-gray-100 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4">Licencia de uso</h1>
                    <p className="text-lg">
                    Copyright 2022 Hospital de Niños JMR<br/><br/>
Por la presente se concede permiso, libre de cargos, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), a utilizar el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias del Software, y a permitir a las personas a las que se les proporcione el Software a hacer lo mismo, sujeto a las siguientes condiciones:<br/><br/>

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.
EL SOFTWARE SE PROPORCIONA "COMO ESTÁ", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO PARTICULAR E INCUMPLIMIENTO. EN NINGÚN CASO LOS AUTORES O PROPIETARIOS DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, DERIVADAS DE, FUERA DE O EN CONEXIÓN CON EL SOFTWARE O SU USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
                    </p>
                    
                </div>

            </div>
            <div className="flex flex-col w-1/4 h-auto space-y-2 p-2 overflow-y-auto">
                {
                    topics.map(topic => (
                        <a href={topic.href} className="text-left text-sm text-gray-800 dark:text-gray-200 hover:text-cream-1">{topic.title}</a>
                    ))
                }
            </div>
        </div>
    );
}
