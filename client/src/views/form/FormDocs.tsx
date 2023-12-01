import React, { useState, FormEvent } from 'react';
import { uploadFile } from '../../firebase/config.js';
import ButtonCancel from '../../components/buttons/ButtonCancel.tsx';
import ButtonCreate from '../../components/buttons/ButtonCreate.tsx';
import { useNavigate } from 'react-router-dom';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function FormDocs() {
    const [showLabel, setShowLabel] = useState(true);
    const [errorDoc, setErrorDoc] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    
    console.log(pdfFile);
    
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/");
    }

    const fileType = ["application/pdf"];
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        // Verificar si el tipo de archivo es un PDF
        if (selectedFile && fileType.includes(selectedFile.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = (e) => {
            setPdfFile(e.target.result);
          }
          setErrorDoc(false);
        } else {
          setErrorDoc(true); 
        }
      } else {
        setPdfFile(null);
      }
    };
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        //Subo el archivo a Firebase
        try {
          if(pdfFile) {
            const response = await uploadFile(pdfFile);
            setPdfFile(null);
            //Majerar la url de la imagen (Guardar en DB p.e.)
            console.log(response);
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
        setPdfFile(null);
      }
    };

  const newplugin = defaultLayoutPlugin();
  return (
    <div className=' flex items-center justify-center gap-8 bg-stone-100 h-screen w-full'>
      <div className=' flex flex-col items-center justify-center   bg-white p-4 sm:p-6 rounded-lg h-[400px] w-[700px] overflow-auto'>
        <h1 className=' text-blue-500 text-2xl'><b>Upload a pdf file</b></h1>
        <form onSubmit={handleSubmit} >
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
            </div>
            <div className="flex justify-center items-center gap-6">
              <ButtonCancel onClick={handleNavigate} /> 
              <ButtonCreate onSubmit={handleSubmit} />
            </div>     
        </form>
      </div>
        {/* Mostrar la previsualización del PDF si la URL está disponible */}
        <div className=' preview-doc'>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {pdfFile ? <>
              <Viewer fileUrl={pdfFile} plugins={[newplugin]} />
            </>
            :
            errorDoc ?
            <>WRONG TYPE OF FILE</>
            :
            <>NO PDF SELECTED</>}
          </Worker>
      </div>
    </div>
  )
}
