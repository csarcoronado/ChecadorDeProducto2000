import { useState } from 'react'
import { useEffect } from 'react';
import { FiDelete,FiChevronUp, FiChevronDown, FiArrowDown, FiArrowUp } from "react-icons/fi";
import {IoCloseSharp} from "react-icons/io5"
import './tecla.css'
import './cierre.css'
import './checador.css'
import { TbLetterCaseUpper } from "react-icons/tb";
import { GoNumber } from "react-icons/go";
import { AiFillRightCircle, AiOutlineEnter } from "react-icons/ai";
import { BorraIma } from '../interface/interfaceTabla';
import { GiMoneyStack } from "react-icons/gi";
import { BsCartCheck } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Red2000 from './Red2000.jpeg'
import { FaBarcode } from "react-icons/fa";

interface VirtualKeyboardProps{
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
    activeInput: string;
    searchText: string;
    isFieldSelected: boolean;
    handleTecladoInput: (key: string) => void;
    id: string;
    InputValues: string;
    setInputValues: React.Dispatch<React.SetStateAction<InputValues>>;
    input: string;
    imageData: BorraIma[];
    addData: () => void;
    handleSearch: (e: React.FormEvent) => void;
    inputs: string;
    setInputs: React.Dispatch<React.SetStateAction<string>>;
    calcularMontoIVA: () => string;
}

interface ProductProps {
  name: string;
  code: string;
  price?: number;
  discount?: number;
  imageSrc: string;
}

export const VirtualKeyboard = ({ name, code, price, discount, imageSrc }: ProductProps) => {
    

    const [imageData, setImageData] = useState<BorraIma[]>([]);
    const [tecladoVisible, setTecladoVisible] = useState(false);
    const [keyboardPosition, setKeyboardPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [tecladoLetrasVisible, setTecladoLetrasVisible] = useState(true);
    const [savedBox, setSavedBox] = useState('');
    const [isUppercase, setIsUppercase] = useState(true);
    const [mostrarBox, setMostrarBox] = useState(false);
    const [mostrarBox1, setMostrarBox1] = useState(true);
    const [searchInput, setSearchInput] = useState<string>('');
    const [activeBox, setActiveBox] = useState<string | null>(null);
    const [originalData, setOriginalData] = useState<BorraIma[]>([]);
    const [formData, setFormData] = useState<BorraIma>({name:'', precio: ''});
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [containerSize, setContainerSize] = useState<{ width: string; height: string }>({
      width: '100%',
      height: '620px',
    });
    const [containerSizes, setContainerSizes] = useState<{ width: string; height: string }>({
      width: '100%',
      height: '620px',
    });

    const handleIncrement = (amount: number) => {
        setInput((prevInput) => {
          const currentInput = parseFloat(prevInput) || 0;
          const result = currentInput + amount;
          const newInput = result.toString();
          console.log(newInput); // Imprime el valor actual de input
          return newInput;
        });
      };

      const handleBackspace = () => {
        setInput((prevInput) => prevInput.slice(0,-1));
    };

    const handleBackspaces = () => {
      setInputs((prevInputs) => prevInputs.slice(0,-1));
  };

      const handleMouseDown = (e) => {
        setIsDragging(true);
      };
    
      const handleMouseMove = (e) => {
        if (isDragging) {
          setKeyboardPosition((prevPosition) => ({
            x: prevPosition.x + (e.pageX - prevPosition.x),
            y: prevPosition.y + (e.pageY - prevPosition.y),
          }));
        }
      };
    
      const handleMouseUp = () => {
        setIsDragging(false);
      };
    
      useEffect(() => {
        // Agregar los manejadores de eventos al documento completo
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    
        // Limpiar los manejadores al desmontar el componente
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }, [handleMouseMove, handleMouseUp]);

      const closeTeclado = () => {
        alert ('Seguro que quieres eliminar el pedido');
        setTecladoVisible(false);
      };

      const handleIncrementOne = () => {
        setInput((prevInput) => {
          const currentInput = parseFloat(prevInput) || 0;
          const result = currentInput + 1;
          const newInput = result.toString();
          console.log(newInput); // Imprime el valor actual de input
          return newInput;
        });
      };

      const handleDecrementOne = () => {
        setInput((prevInput) => {
          const currentInput = parseFloat(prevInput) || 0;
          const result = currentInput - 1;
          const newInput = result.toString();
          console.log(newInput); // Imprime el valor actual de input
          return newInput;
        });
      };

      const handleClearInput = () => {
        setInput('');
      };

      const handleClearInputs = () => {
        setInputs('');
      };

      const handleEnterKeyPress = () => {
        closeTeclado();
      };

      const handleSpacePress = () =>{
        setInputs((prevInputs) => prevInputs + ' ');
      }

      const handleToggleCase = () => {
        setIsUppercase((prev) => !prev);
        setTecladoLetrasVisible((prev) => !prev);
      };

      const handleKeyClick = (key: string) => {
        // Actualiza el contenido del input solo si el input activo es 'cantidad'
        const adjustedKey = isUppercase ? key.toUpperCase() : key.toLowerCase();
        setInput((prevInput) => prevInput + adjustedKey);
      };
      
      const handleKeyClicks = (key: string) => {
        // Actualiza el contenido del input solo si el input activo es 'cantidad'
        const adjustedKey = isUppercase ? key.toUpperCase() : key.toLowerCase();
        setInputs((prevInputs) => prevInputs + adjustedKey);
      };

      const handleSaveBox = () => {
        // Puedes guardar la información actual en el estado del componente
        
      
        setSavedBox('Información a guardar'); // Cambia esto con la información que deseas guardar
      };

      const toggleBox = () => {
        setMostrarBox(!mostrarBox);
      };

      const cambiarBox = () => {
        setMostrarBox1(!mostrarBox1);
      };


      const clearInput = () => {
        setSearchInput('');
      };
    
      const handleBoxOpen = (boxType: string) => {
        setActiveBox(boxType);
      };

      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const renderPaymentOptions = () => (
        <div className='payment-options'>
          <div className='conteiner1'>
          <div className='conteiner0 w-64 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6 '>
          <form className='formss'>
             <button className='btn text-danger buttonXeps' onClick={onClose}><IoCloseSharp/></button>
            </form> 
            <div className='conteiner1'>
            <div className='conteiner'>
              <div className='letters'><strong>Opciones de pago</strong></div>
              
          <form className="form">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nomb'>
                Efectivo:
              </span>
            </label>
          </form>
          <form className="form">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nomb'>
              Transferencia:
              </span>
            </label>
          </form>
          <div className='conteinerDr'>
          <div className='letters'><strong> Dinero Recibido</strong></div>
          <div className='conteinerNT'>
          <p>Recibo:</p>
          <p>Cambio:</p>
          <p>Puntos:</p>
          </div>
          <button className='buttonCon'>Comprar</button> 
          </div>
          </div>
        <div className='conteinerR'>
          <div className='letters'><strong>Resumen de la orden</strong></div>
          <div className='conteinerNT'>
                   <p><strong>Nombre:</strong> Cesar Castillo </p>
                   <p><strong>Estado:</strong> Sinaloa</p> 
                   <p><strong>Codigo Postal:</strong> 82030</p> 
                   <p><strong>Teléfono:</strong> 6692601076</p>
     
          </div>
          <div className='letters'><strong>Detalles de la orden</strong></div>
            <div className='conteinerNT'>
              <p><strong>Numero de pedido:</strong> 0 </p>
              <p><strong>Subtotal:</strong> 0</p>
              <p><strong>Ahorrando:</strong> 0</p>
              <p><strong>Impuesto:</strong> ${calcularMontoIVA()}</p>
              <p><strong>Total:</strong> 0</p>
            </div>
        </div>      
      </div>
      </div>
      </div>
    </div>

  );

      const renderPaymentOptionss = () => (
        <div className='payment-options'>
          
          {mostrarBox1 ? (
           <div className='conteiner23'>
           <div className='conteiner02 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
                
                <div className='box conteiner2 ' > 
               <form className="forms">
               <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
               </form>
               <div className='letterss'>Resumen de la orden</div>
                   <div className='conteinerNT'>
                            <p><strong>Nombre:</strong> Cesar Castillo </p>
                            <p><strong>Estado:</strong> Sinaloa</p> 
                            <p><strong>Codigo Postal:</strong> 82030</p> 
                            <p><strong>Teléfono:</strong> 6692601076</p>
              
                   </div>
                   <div className='letterss'>Detalles de la orden</div>
                   <div className='conteinerNT'>
                   <p><strong>Numero de pedido:</strong> 0 </p>
                   <p><strong>Subtotal:</strong> 0</p>
                   <p><strong>Ahorrando:</strong> 0</p>
                   <p><strong>Impuesto:</strong> ${calcularMontoIVA()}</p>
                   <p><strong>Total:</strong> 0  <button className='buttonBN' onClick={cambiarBox}><MdOutlineNavigateNext /></button></p>
                  
                   </div>
                 
                </div>
              </div> 
           </div>

   ):( 
    <div className='conteiner23'>
          <div className='conteiner01 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
       <div className='box conteiner22 '>
       <form className='forms'>
       <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
       </form>
       <div className='letterss'>Opciones de pago</div>
          <form className="form">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nomb'>
                Efectivo:
              </span>
            </label>
          </form>
          <form className="form">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nomb'>
              Transferencia:
              </span>
            </label>
          </form>
          <div className='letterss'>Dinero Recibido</div>
          <div className='conteinerNT'>
          <p>Recibo:</p>
          <p>Cambio:</p>
          <p>Puntos:</p>
          </div>
          <button className='buttonBN' onClick={cambiarBox}><IoIosArrowBack /></button>
          <button className='buttonCon'>Comprar</button>  
          </div>
          </div>
    </div>

          )}
        </div>
      );

      const renderPaymentOptionsss = () => (
        <div className='payment-options'>
          
          {mostrarBox1 ? (
           <div className='conteiner233'>
           <div className='conteiner022 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
                
                <div className='box conteiner223 ' > 
               <form className="forms">
               <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
               </form>
               <div className='letterss'>Resumen de la orden</div>
                   <div className='conteinerNT'>
                            <p><strong>Nombre:</strong> Cesar Castillo </p>
                            <p><strong>Estado:</strong> Sinaloa</p> 
                            <p><strong>Codigo Postal:</strong> 82030</p> 
                            <p><strong>Teléfono:</strong> 6692601076</p>
              
                   </div>
                   <div className='letterss'>Detalles de la orden</div>
                   <div className='conteinerNT'>
                   <p><strong>Numero de pedido:</strong> 0 </p>
                   <p><strong>Subtotal:</strong> 0</p>
                   <p><strong>Ahorrando:</strong> 0</p>
                   <p><strong>Impuesto:</strong> ${calcularMontoIVA()}</p>
                   <p><strong>Total:</strong> 0  <button className='buttonBN' onClick={cambiarBox}><MdOutlineNavigateNext /></button></p>
                  
                   </div>
                 
                </div>
              </div> 
           </div>

   ):( 
    <div className='conteiner233'>
          <div className='conteiner011 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
       <div className='box conteiner222 '>
       <form className='forms'>
       <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
       </form>
       <div className='letterss'>Opciones de pago</div>
          <form className="formi">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nombr'>
                Efectivo:
              </span>
            </label>
          </form>
          <form className="formi">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nombr'>
              Transferencia:
              </span>
            </label>
          </form>
          <div className='letterss'>Dinero Recibido</div>
          <div className='conteinerNT'>
          <p>Recibo:</p>
          <p>Cambio:</p>
          <p>Puntos:</p>
          </div>
          <button className='buttonBN' onClick={cambiarBox}><IoIosArrowBack /></button>
          <button className='buttonCon'>Comprar</button>  
          </div>
          </div>
    </div>

          )}
        </div>
      );

      const renderPaymentOptionssss = () => (
        <div className='payment-options'>
          
          {mostrarBox1 ? (
           <div className='conteiner2333'>
           <div className='conteiner0222 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
                
                <div className='box conteiner2233 ' > 
               <form className="forms">
               <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
               </form>
               <div className='letras'>Resumen de la orden</div>
                   <div className='conteinerNT'>
                            <p><strong>Nombre:</strong> Cesar Castillo </p>
                            <p><strong>Estado:</strong> Sinaloa</p> 
                            <p><strong>Codigo Postal:</strong> 82030</p> 
                            <p><strong>Teléfono:</strong> 6692601076</p>
              
                   </div>
                   <div className='letras'>Detalles de la orden</div>
                   <div className='conteinerNT'>
                   <p><strong>Numero de pedido:</strong> 0 </p>
                   <p><strong>Subtotal:</strong> 0</p>
                   <p><strong>Ahorrando:</strong> 0</p>
                   <p><strong>Impuesto:</strong> ${calcularMontoIVA()}</p>
                   <p><strong>Total:</strong> 0  <button className='buttonBN' onClick={cambiarBox}><MdOutlineNavigateNext /></button></p>
                  
                   </div>
                 
                </div>
              </div> 
           </div>

   ):( 
    <div className='conteiner2333'>
          <div className='conteiner0111 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
       <div className='box conteiner2222 '>
       <form className='forms'>
       <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
       </form>
       <div className='letterss'>Opciones de pago</div>
          <form className="formi">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nombr'>
                Efectivo:
              </span>
            </label>
          </form>
          <form className="formi">
            <input type="text" required />
            <label className="lbl-nombre">
              <span className='text-nombr'>
              Transferencia:
              </span>
            </label>
          </form>
          <div className='letterss'>Dinero Recibido</div>
          <div className='conteinerNT'>
          <p>Recibo:</p>
          <p>Cambio:</p>
          <p>Puntos:</p>
          </div>
          <button className='buttonBN' onClick={cambiarBox}><IoIosArrowBack /></button>
          <button className='buttonCom'>Comprar</button>  
          </div>
          </div>
    </div>

          )}
        </div>
      );

      const renderPaymentOptionC = () => (
        <div className='payment-options'>
          <div className='containerC0'>
           <div className='conteinerC00 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
                
                <div className='box containerC00 ' > 
               <form className="forms">
               <div className='letters buttonXepC'>Cierre</div>
               <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
               </form>

                   <div className='conteinerNT'>
                            <p><strong>Usuario:</strong> Admin </p>
                            <p><strong>Apertura de Caja:</strong> 10:33</p> 
                            <p><strong>Cierre de Caja:</strong> 11:34</p> 
                            <p><strong>Monto inicial:</strong> $0.00</p>
                   </div>
                <table className='table'>
                   <thead>
                     <tr>
                      <th>Totales</th>
                      <th>Efectivo</th>
                      <th>Tarjeta</th>
                      <th>Transferencia</th>
                      <th>Total</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                     </tr>
                     <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                     </tr>
                     <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                     </tr>
                   </tbody>
                </table>
                <form className="forms">
                  <button className='buttonXepG'>Guardar</button>
                </form>
                </div>
              </div> 
           </div>
           
        </div>);

      const renderPaymentOption = () => (
        <div className='payment-options'>
          <div className='containerC11'>
           <div className='containerC22 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
                
                <div className='box containerC33 ' > 
               <form className="forms">
               <div className='letterss buttonXepC'>Cierre</div>
               <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
               </form>

                   <div className='letrass conteinerNT'>
                            <p><strong>Usuario:</strong> Admin </p>
                            <p><strong>Apertura de Caja:</strong> 10:33</p> 
                            <p><strong>Cierre de Caja:</strong> 11:34</p> 
                            <p><strong>Monto inicial:</strong> $0.00</p>
                   </div>
                <table className=' letrass table'>
                   <thead>
                     <tr>
                      <th>Totales</th>
                      <th>Efectivo</th>
                      <th>Tarjeta</th>
                      <th>Transferencia</th>
                      <th>Total</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                     </tr>
                     <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                     </tr>
                     <tr>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                     </tr>
                   </tbody>
                </table>
                <form className="forms">
                  <button className='buttonXepG'>Guardar</button>
                </form>
                </div>
              </div> 
           </div>
           
        </div>);

              const renderPaymentOptionEc = () => (
                <div className='payment-options'>
                  <div className='containerC1'>
                   <div className='containerC2 p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6'>
                        
                        <div className='box containerC3 ' > 
                       <form className="forms">
                       <div className='letterss buttonXepC'>Cierre</div>
                       <button className='btn text-danger buttonXep' onClick={onClose}><IoCloseSharp/></button>
                       </form>
        
                           <div className='letrass conteinerNT'>
                                    <p><strong>Usuario:</strong> Admin </p>
                                    <p><strong>Apertura de Caja:</strong> 10:33</p> 
                                    <p><strong>Cierre de Caja:</strong> 11:34</p> 
                                    <p><strong>Monto inicial:</strong> $0.00</p>
                           </div>
                        <table className='containerC4 table'>
                           <thead>
                             <tr>
                              <th>Totales</th>
                              <th>Efectivo</th>
                              <th>Tarjeta</th>
                              <th>Transferencia</th>
                              <th>Total</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                             </tr>
                             <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                             </tr>
                             <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                             </tr>
                           </tbody>
                        </table>
                        <form className="forms">
                          <button className='buttonXepG'>Guardar</button>
                        </form>
                        </div>
                      </div> 
                   </div>
                   
                </div>);

      const opcionesPagoVisible = windowWidth > 1000;

      useEffect(() => {
        // Función para actualizar el tamaño del contenedor
        const updateContainerSize = () => {
          if (windowWidth < 1000) {
            setContainerSize({ width: '80%', height: '530px' });
          } else {
            // Ajusta los valores según tus necesidades
            setContainerSize({ width: '40%', height: '535px' });
          }
        };
        // Llama a la función al montar el componente y cuando cambia el ancho de la ventana
        updateContainerSize();
    
        // Limpia el efecto cuando el componente se desmonta
        return () => {
          // Limpia el event listener cuando el componente se desmonta
          window.removeEventListener('resize', updateContainerSize);
        };
      }, [windowWidth]);

      useEffect(() => {
        // Función para actualizar el tamaño del contenedor
        const updateContainerSizes = () => {
          if (windowWidth < 1000) {
            setContainerSizes({ width: '60%', height: '390px' });
          } else {
            // Ajusta los valores según tus necesidades
            setContainerSizes({ width: '40%', height: '400px' });
          }
        };
        // Llama a la función al montar el componente y cuando cambia el ancho de la ventana
        updateContainerSizes();
    
        // Limpia el efecto cuando el componente se desmonta
        return () => {
          // Limpia el event listener cuando el componente se desmonta
          window.removeEventListener('resize', updateContainerSizes);
        };
      }, [windowWidth]);


      const handleClick =() => {
        alert("Seguro que quieres eliminar el pedido");
      }

      const calculateDiscountedPrice = () => {
        if (price && discount) {
          const discountedPrice = price - price * (discount / 100);
          return discountedPrice.toFixed(2);
        }
        return 'No disponible';
      };

      const renderPaymentOptionIng = () => (
        <div className='payment-options'>
          <div className='conteinerHg'>
                          <div className="conteinerGg p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6">
                          <form className="formug">
                                  <div className='buttonXepCheg'>Nombre de la empresa</div>
                                  <img  className='buttonXepChg' src={Red2000} style={{width: '10%', height:'auto'}}/>
                          </form>
                          <div className="conteinerCg">
                            <h1>Pase el código por el escaner </h1>
                            <h1> por favor, gracias</h1>
                            <h1><FaBarcode/></h1>                                            
                          </div>
                          <input type="submit" className='inputCh'/>
                        </div> 
                      </div>  
        </div>);
      const renderPaymentOptionChg = () => (
        <div className='payment-options'>
          <div className='conteinerHg'>
                          <div className="conteinerGg p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6">
                          <form className="formug">
                                  <div className='buttonXepCheg'>Nombre de la empresa</div>
                                  <img  className='buttonXepChg' src={Red2000} style={{width: '10%', height:'auto'}}/>
                          </form>
                          <div className="conteinerCg">
                            <h3>Producto:{name}</h3>
                            <p>Codigo de barra ó folio: {code}</p>
                            {price ? (
                              <p>
                                Precio: ${price.toFixed(2)} (Descuento: {discount}%)
                              </p>
                            ) : (
                              <p>
                                Precio con descuento: ${calculateDiscountedPrice()} (sin descuento
                                disponible)
                              </p>
                            )}
                          </div>
                          <div className="product-image">
                            <img  src={Red2000}/>
                          </div>
                        </div> 
                      </div>  
        </div>);
const renderPaymentOptionInm = () => (
  <div className='payment-options'>
    <div className='conteinerHm'>
                    <div className="conteinerGm p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6">
                    <form className="formum">
                            <div className='buttonXepChem'>Nombre de la empresa</div>
                            <img  className='buttonXepChm' src={Red2000} style={{width: '10%', height:'auto'}}/>
                    </form>
                    <div className="conteinerCm">
                      <h1>Pase el código por el escaner por favor, gracias</h1>
                      <h1><FaBarcode/></h1>                                            
                    </div>
                    <input type="submit" className='inputCh'/>
                  </div> 
                </div>  
  </div>);
      const renderPaymentOptionChm = () => (
        <div className='payment-options'>
          <div className='conteinerHm'>
                          <div className="conteinerGm p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6">
                          <form className="formum">
                                  <div className='buttonXepChem'>Nombre de la empresa</div>
                                  <img  className='buttonXepChm' src={Red2000} style={{width: '10%', height:'auto'}}/>
                          </form>
                          <div className="conteinerCm">
                            <h3>Producto:{name}</h3>
                            <p>Codigo de barra ó folio: {code}</p>
                            {price ? (
                              <p>
                                Precio: ${price.toFixed(2)} (Descuento: {discount}%)
                              </p>
                            ) : (
                              <p>
                                Precio con descuento: ${calculateDiscountedPrice()} (sin descuento
                                disponible)
                              </p>
                            )}
                          </div>
                          <div className="product-image">
                            <img  src={Red2000}/>
                          </div>
                        </div> 
                      </div>  
        </div>);
        const renderPaymentOptionInc = () => (
          <div className='payment-options'>
            <div className='conteinerH'>
                            <div className="conteinerG p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6">
                            <form className="formu">
                                    <div className='buttonXepChe'>Nombre de la empresa</div>
                                    <img  className='buttonXepCh' src={Red2000} style={{width: '10%', height:'auto'}}/>
                            </form>
                            <div className="conteinerC">
                              <h1>Pase el código por el escaner por favor, gracias</h1>
                              <h1><FaBarcode/></h1>                                            
                            </div>
                            <input type="submit" className='inputCh'/>
                          </div> 
                        </div>  
          </div>);
      const renderPaymentOptionChc = () => (
        <div className='payment-options'>
          <div className='conteinerH'>
                <div className="conteinerG p-2 shadow-lg rounded-md p-6 border border-dark-gray-200 space-y-6">
                <form className="formu">
                        <div className='buttonXepChe'>Red 2000 Diseño y Hospedaje Web</div>
                        <img  className='buttonXepCh' src={Red2000} style={{width: '10%', height:'auto'}}/>
                </form>
                <div className="conteinerC">
                  <h3>Producto:{name} Factura</h3>
                  <p>Codigo de barra ó folio: P2AC2{code}</p>
                  {price ? (
                    <p>
                      Precio: ${price.toFixed(2)} (Descuento: {discount}%)
                    </p>
                  ) : (
                    <p>
                      Precio con descuento: ${calculateDiscountedPrice()} (sin descuento
                      disponible)
                    </p>
                  )}
                </div>
                <div className="product-image">
                  <img  src={Red2000}/>
                </div>
              </div> 
            </div>  
        </div>);
    return (
      <div>
            {windowWidth >= 820 ? renderPaymentOptionIng() : null}
            {windowWidth >= 820 ? renderPaymentOptionChg() : null}
            {windowWidth < 820 && windowWidth > 500 ? renderPaymentOptionInm() : null}
            {windowWidth <= 500 && windowWidth > 485? renderPaymentOptionInm() : null}
            {windowWidth < 820 && windowWidth > 500 ? renderPaymentOptionChm() : null}
            {windowWidth <= 500 && windowWidth > 485? renderPaymentOptionChm() : null}
            {windowWidth <= 485 ? renderPaymentOptionInc() : null} 
            {windowWidth <= 485 ? renderPaymentOptionChc() : null}  
        {/*
       {windowWidth >= 820 ? renderPaymentOptionC() : null}
       {windowWidth < 820 && windowWidth > 500 ? renderPaymentOption() : null}
       {windowWidth <= 500 && windowWidth > 485? renderPaymentOption() : null}
       {windowWidth <= 485 ? renderPaymentOptionEc() : null}
    */}
{/*
       {windowWidth >= 820 ? renderPaymentOptions() : null}
       {windowWidth < 820 && windowWidth > 500 ? renderPaymentOptionss() : null}
       {windowWidth <= 500 && windowWidth > 385? renderPaymentOptionsss() : null}
       {windowWidth <= 385 ? renderPaymentOptionssss() : null}
    */}    
           {/* <div
          className={`virtual-keyboard ${tecladoVisible ? 'seleccionado' : ''}`}
          style={{
            position: 'absolute',
            left: keyboardPosition.x,
            top: keyboardPosition.y,
            cursor: isDragging ? 'grabbing' : 'grab',
            display: activeInput ? 'block' : 'none', // Agregado: Mostrar solo si hay un input activo
          }}
         onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
        id="teclado"
          className={`bg-white teclado container-teclado ${
            tecladoVisible ? 'teclado-open' : 'teclado-closed'
          }`}
        ></div>
      
        {mostrarBox1 ? (
        
          <div id='teclado' className={`bg-white teclado container-teclado ${tecladoVisible ? 'teclado-open' : 'teclado-closed'}`}>
          <form className='formss'>
          <button className='btn text-danger buttonXe teclado-styles' onClick={onClose}><IoCloseSharp/></button>
          </form>
          {}
              <div className="box containerT">
            
                  <div>
                      <button className='btn buttonN teclado-styles'  onClick={() =>handleIncrement(10)}>10</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('7')}>7</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('8')}>8</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('9')}>9</button>
                    <button className='btn text-danger buttonT teclado-styles'  onClick={handleBackspace}><FiDelete/></button>
                      <button className='btn buttonT teclado-styles' onClick={handleIncrementOne}><FiChevronUp/></button>
                 </div>

                  <div>
                      <button className='btn buttonN teclado-styles'  onClick={() =>handleIncrement(20)}>20</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('4')}>4</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('5')}>5</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('6')}>6</button>
                      <button className='btn text-danger buttonT teclado-styles'  onClick={handleClearInput}>C</button>
                      <button className='btn buttonT teclado-styles' onClick={handleDecrementOne}><FiChevronDown/></button>
                  </div>

                  <div>
                      <button className='btn buttonN teclado-styles'  onClick={() =>handleIncrement(50)}>50</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('1', id)}>1</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('2', id)}>2</button>
                      <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('3', id)}>3</button>
                      <button className='btn buttonTcm' onClick={cambiarBox}><TbLetterCaseUpper/></button>
                 </div>

                  <div>
                      <button className='btn buttonCn teclado-styles'  onClick={() =>handleIncrement(100)}>100</button>
                      <button className='btn buttonC teclado-styles'  onClick={() =>handleKeyClick('0', id)}>0</button>
                      <button className='btn buttonP teclado-styles'  onClick={() =>handleKeyClick('.')}>.</button>
                  </div>
                
              </div>
           

       

          </div> 
         ) : (
          <div className={`box containerTc ${tecladoLetrasVisible ? 'teclado-letras-visible' : ''}`}>
            <form className='formss'><button className='btn text-danger buttonXe teclado-styles' onClick={onClose}><IoCloseSharp/></button></form>
            <div>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('1')}>1</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('2')}>2</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('3')}>3</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('4')}>4</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('5')}>5</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('6')}>6</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('7')}>7</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('8')}>8</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('9')}>9</button>
      <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('0')}>0</button>
      </div>

      <div>
        
      <div>
          <button className='btn buttonL teclado-styles'  onClick={(event) => { event?.stopPropagation(); handleKeyClicks('Q')}}>Q</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('W')}>W</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('E')}>E</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('R')}>R</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('T')}>T</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('Y')}>Y</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('U')}>U</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('I')}>I</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('O')}>O</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('P')}>P</button>
        
      </div>

      <div>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('A')}>A</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('S')}>S</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('D')}>D</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('F')}>F</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('G')}>G</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('H')}>H</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('J')}>J</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('K')}>K</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('L')}>L</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('Ñ')}>Ñ</button>
      </div>

      <div>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('Z')}>Z</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('X')}>X</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('C')}>C</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('V')}>V</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('B')}>B</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('N')}>N</button>
          <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClicks('M')}>M</button>
          <button className='btn text-danger buttonL teclado-styles'  onClick={handleBackspaces}><FiDelete/></button>
          <button className='btn text-danger buttonLct teclado-styles'  onClick={handleClearInputs}>C</button>
          <button className='btn buttonSE teclado-styles'  onClick={handleSpacePress}>_____</button>
          <button className='btn buttonE' onClick={cambiarBox}><GoNumber/></button>
        
        
      </div>

      </div>
      </div>)}
         </div> */}
          </div>

        
    ) 
} 
export default VirtualKeyboard