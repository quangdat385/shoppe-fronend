import className from 'classnames/bind';
import styles from "./Home.module.scss";


import { Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, } from 'react';


import SuggestProducts from './Components/MainContent.js/SuggestProducts';
import MainContent from './Components/MainContent.js';





import ProductCatalogue from './Components/ProductCatalogue/ProductCatalogue';






const cx = className.bind(styles);



function Home() {
  const { page } = useParams
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const srolls = window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setHide(false);
      } else {
        setHide(true);
      }
    })
    return () => window.removeEventListener("scroll", srolls)
  }, [])




  useEffect(() => {
    if (pathname === "/home") {
      navigate(`/home/${page}/sort?&byCollection=0`);
    }


    // eslint-disable-next-line
  }, [pathname, navigate]);


  return <div className={cx("wrapper")}>
    <Routes >
      <Route path="/" element={<MainContent />}>
        <Route path=":page/*" element={<ProductCatalogue />}>
        </Route>

      </Route>
      <Route path="/suggest/:page" element={<SuggestProducts />}></Route>
    </Routes>
    {!hide && <div className={cx("scroll-to-top")} onClick={() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}>
      <svg className="scroll-to-top scroll-to-top__overflow" xmlns="http://www.w3.org/2000/svg" width={40} height={40} version={1} style={{ display: 'block' }}><defs><circle id="scroll-to-top-b" cx={22} cy={21} r={20} />
        <filter id="scroll-to-top-a" width="118%" height="118%" x="-9%" y="-6%" filterUnits="objectBoundingBox">
          <feOffset dy={1} in="SourceAlpha" result="f" />
          <feGaussianBlur in="f" result="f" stdDeviation={1} />
          <feComposite in="f" in2="SourceAlpha" operator="out" result="f" />
          <feColorMatrix in="f" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" />
        </filter>
      </defs>
        <g fill="none" fillRule="evenodd">
          <use fill="#000" filter="url(#scroll-to-top-a)" xlinkHref="#b" />
          <use fill="#fff" xlinkHref="#scroll-to-top-b" />
          <circle cx={22} cy={21} r={20} />
          <path fill="#EE4D2D" d="M12 13h20v2H12zm11 7v13h-2V20l-6 6-1-2 8-8 9 8-2 2z" />
        </g>
      </svg>
    </div>}

  </div>
}

export default Home;