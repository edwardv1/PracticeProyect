import { useState, useEffect } from "react";

export default function Header() {
  // Establezco una clase CSS condicional basada en el valor de scrolling
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll); //evento de desplazamiento al montar el componente

    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpia el evento de desplazamiento al desmontar el componente
    };
  }, []);

  const navClass = scrolling
    ? "bg-[rgba(112,112,112,0.9)] transition-bg duration-500"
    : "bg-[rgba(0,0,0,0.38)] transition-bg duration-500";

  // Agrego la configuracion para establecer el tema del HTML en modo oscuro o claro.
  //   const [theme, setTheme] = useState("light");
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        return 'dark'
    } else {
        return 'light'
    }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-[100vw] py-3 m-auto px-10 text-base font-base items-center ${navClass}`}
    >
      <div className="flex items-end justify-end w-full">
        <button className=" w-[200px] h-[40px] rounded-lg bg-slate-400 dark:bg-slate-800 cursor-pointer dark:text-white" onClick={handleChangeTheme}>
          Change Theme
        </button>
      </div>
    </nav>
  );
}
