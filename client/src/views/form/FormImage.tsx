import { useState, FormEvent } from 'react';
import { uploadFile } from '../../firebase/config.js';
import ButtonCancel from '../../components/buttons/ButtonCancel.tsx';
import { useNavigate } from 'react-router-dom';
import ButtonCreate from '../../components/buttons/ButtonCreate.tsx';

export default function FormImage() {
    const [showLabel, setShowLabel] = useState(true);
    const [errorDoc, setErrorDoc] = useState(false);
    const [file, setFile]= useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/");
    }

    //Mostrar la imagen localmente antes de subirla a Firebase
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
    
      if (selectedFile) {
        const objectUrl = URL.createObjectURL(selectedFile);
        // Verificar si el tipo de archivo es una imagen
        if (selectedFile.type.startsWith('image/')) {
          setImageUrl(objectUrl);
          setErrorDoc(false);
        } else {
          // Si no es una imagen, puedes mostrar un mensaje o realizar otra acción
          setImageUrl(null);
          setErrorDoc(true);
          //setImageUrl(null); // Limpiar la URL de la imagen para evitar confusiones
        }
        setFile(selectedFile);
      }
    };

    //Funcion que despacha los inputs
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { 
        console.log("Entro en el submit");
        event.preventDefault();
        //Subo el archivo a Firebase
        try {
          if(file) {
            const response = await uploadFile(file);
            //Majerar la url de la imagen (Guardar en DB p.e.)
            console.log(response);
            setImageUrl(null);
          }
        } catch (error) {
          console.error(error);
          window.alert("Failed to upload file: " + error)
        }  
    }

    const handleCheckboxChange = () => {
      setShowLabel(!showLabel);
      setErrorDoc(false);
      if(showLabel){
        setImageUrl(null);
      }
    };

  return (
    <div className=' flex items-center justify-center bg-stone-100 h-screen w-full'>
      <div className=' flex flex-col items-center bg-white p-4 sm:p-6 rounded-lg h-[800px] w-[700px] overflow-auto'>
          <h1 className=' text-blue-500 text-2xl'><b>Upload a image file</b></h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <div className="flex flex-col flex-grow">

                      <div className="mt-2 flex gap-4">
                        <p className=" mt-4 bg-none text-sm md:text-lg xl:text-xl text-black">¿Do you want to upload a file?</p>
                        <input
                          type="checkbox"
                          id="showLabelCheckbox"
                          checked={showLabel}
                          className='custom-checkbox'
                          onChange={handleCheckboxChange}
                        />
                        
                      </div>
                      {
                        showLabel &&
                        <label htmlFor="fileInput" className="relative text-sm text-center mt-2 md:text-lg xl:text-xl cursor-pointer bg-blue-500 text-white rounded-full px-2 py-1">
                          Select File
                          <input 
                          type="file"
                          id="fileInput"
                          name="file"  
                          className="hidden"
                          // onChange={(event) => setFile(event.target.files[0])}
                          onChange={handleFileChange}
                        />
                        </label>
                      }
                  </div>
                  {/* Mostrar la imagen si la URL de Firebase está disponible */}
                  {imageUrl && (
                    <div className=' flex justify-center items-center mt-6'>
                      <img
                        src={imageUrl}
                        alt="Uploaded file preview"
                        style={{ maxWidth: '300px' }}
                      />
                    </div>
                  )}
                  {errorDoc && 
                  <div className=' flex justify-center items-center mt-6'>
                    Selected file is not an image
                  </div>}
              </div>
              <div className="flex justify-center items-center gap-6">
                <ButtonCancel onClick={handleNavigate} /> 
                <ButtonCreate onSubmit={handleSubmit}/>
              </div>
          </form>
        </div>
    </div>
  )
}
