import '../../styles/style.css'
import logo from '../../images/logo-icon-black.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate  = useNavigate();
  const location = useLocation();
  const [url] = useState(location.pathname);
 

  useEffect(()=>{
    
  },[])
  return (
      <nav className="navbarcentre navbar navbar-expand-lg  header_navbar">
        <a className="navbar-brand" href="">
          <img src={logo} alt=""/>
          <span>
          Apt<span className='Dues' >Dues</span>
          </span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className=""> </span>
        </button>

        {url != '/auth' && <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto align-items-center">
            <li className="nav-item active">
              <a  onClick={() => navigate("/")} className="nav-link" href="">Home <span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate("/appartement")} className="nav-link" href=""> appartement </a>
            </li>

            <li className="nav-item">
              <a onClick={() => navigate("/paiement")} className="nav-link" href=""> Payment  </a>
            </li>
            <li className="nav-item">
              <a onClick={() => navigate("/controller")} className="nav-link" href=""> Controller  </a>
            </li>
          </ul>
          <div className="user_option">
            <a href="" className="user_login_link">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 518.95 441.44">
                <title>user-icon</title>
                <g className="">
                  <path className="" d="M631.75,452.8A132.22,132.22,0,0,1,659,495.72H140.05q9.84-24.53,30.1-45.27,21.27-21.69,52.41-37.73,89.78-47.16,181.63-45.51T585.83,417.9Q613.32,433,631.75,452.8ZM322.2,73.15q-34.77,17.92-55,49.75A127.59,127.59,0,0,0,247,192.7a126.32,126.32,0,0,0,20.76,70,146.22,146.22,0,0,0,55.53,50.46q35.28,18.87,77.06,18.63t77.07-19.57q34.75-18.86,54.49-50,20.75-32.55,20.75-70.27t-21.27-69.8q-20.25-31.12-54.49-49a163.52,163.52,0,0,0-77.33-18.87Q357.49,54.28,322.2,73.15Z" transform="translate(-140.05 -54.28)"></path>
                </g>
              </svg>
            </a>
          </div>
        </div>}
      </nav>
  )
}

export default  Navbar