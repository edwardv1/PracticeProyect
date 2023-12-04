import { useState, FormEvent } from 'react';
import { uploadFile } from '../../firebase/config.js';
import ButtonCancel from '../../components/buttons/ButtonCancel.tsx';
import { useNavigate } from 'react-router-dom';
import ButtonCreate from '../../components/buttons/ButtonCreate.tsx';

export default function FormVideo() {
    const [showLabel, setShowLabel] = useState(false);
    const [errorDoc, setErrorDoc] = useState(false);
    const [file, setFile]= useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/");
    }

    //Mostrar la imagen localmente antes de subirla a Firebase
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            console.log(objectUrl);
            
            // Verificar si el tipo de archivo es un video
            if (selectedFile.type.startsWith('video/')) {
                setVideoUrl(objectUrl);
                setErrorDoc(false);
            } else {
                setVideoUrl(null);
                setErrorDoc(true);
            }
        }
        setFile(selectedFile);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Entro submit");    
        console.log(file);
        
        try {
          if (file) {
            const response = await uploadFile(file);
            // Manejar la URL del video (Guardar en la base de datos, etc.)
            setFile(null);
            setVideoUrl(null);
            console.log(response);
          }
        } catch (error) {
          console.error(error);
          window.alert('Failed to upload file: ' + error);
        }
      };

    const handleCheckboxChange = () => {
      setShowLabel(!showLabel);
      setErrorDoc(false);
      if(showLabel){
        setVideoUrl(null);
      }
    };

  return (
    <div className=' flex items-center justify-center bg-stone-100 h-screen w-full'>
      <div className=' flex flex-col items-center bg-white p-4 sm:p-6 rounded-lg h-[800px] w-[700px] overflow-auto'>
          <h1 className=' text-blue-500 text-2xl'><b>Upload a video file</b></h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <div className="flex flex-col flex-grow ">

                      <div className="mt-2 flex gap-4 items-center">
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
                      {file && 
                      <div className=' text-center'>
                        {file.name}
                      </div>}
                  </div>
                  {
                  errorDoc && 
                  <div className=' flex justify-center items-center mt-6'>
                    Selected file is not a video
                  </div>
                  }
                  {/* Mostrar el video si la URL de Firebase está disponible */}
                  {videoUrl && (
                    <div className='flex justify-center items-center mt-6'>
                        <video width='600' height='450' controls>
                            <source src={videoUrl} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
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
