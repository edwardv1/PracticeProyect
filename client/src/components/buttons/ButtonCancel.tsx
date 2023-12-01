

export default function ButtonCancel({onClick}) {

  return (
    <>
        <button onClick={onClick} type="button" className=" mt-4 mx-1 px-3 w-[90px] sm:w-[100px] h-[40px] bg-red-600 rounded-lg text-base sm:text-lg text-white cursor-pointer">Cancel</button>
    </>
  )
}
