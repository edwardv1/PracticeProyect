import React from 'react';

interface ButtonCreateProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ButtonCreate: React.FC<ButtonCreateProps> = ({ onSubmit }) => {

  return (
    <button
      className={`mt-4 mx-1 px-3 w-[100px] h-[40px] bg-green-500 rounded-lg text-lg text-white cursor-pointer `} 
      type="submit"
      onClick={onSubmit}
    >
      Upload
    </button>
  );
}

export default ButtonCreate;
