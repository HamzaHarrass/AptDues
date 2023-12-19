import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/AuthStyle.css';
import Navbar from '../../assets/views/common/Navbar';

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    const { email, password } = formData;

    if (!email || !password) {
      setLoginError('Please fill in both email and password.');
      return;
    }

    setLoginError(null);

    const user = {
      email,
      password,
    };

    console.log(user);

    axios
      .post('http://localhost:3000/auth/login', user)
      .then((response) => {
        console.log(response);
        console.log('Login successful');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setLoginError('Login failed. Please check your credentials.');
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="form">
        <div className="form__box">
          <div className="form__left">
            <div className="form__padding">
              <img
                className="form__image"
                src="https://i.pinimg.com/originals/8b/44/51/8b4451665d6b2139e29f29b51ffb1829.png"
                alt="Logo"
              />
            </div>
          </div>
          <div className="form__right">
            <div className="form__padding-right">
              <form>
                <h1 className="form__title">Member Login</h1>
                <input
                  className="form__email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  className="form__password"
                  type="password"
                  placeholder="******"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  className="form__submit-btn"
                  type="button"
                  value="Login"
                  onClick={login}
                />
              </form>
              <span>
                Forgot
                <a className="form__link" href="#">
                  Username
                </a>
                <a>/</a>
                <a className="form__link" href="#">
                  Password
                </a>
              </span>
              <p>
                {' '}
                <a className="form__link" href="#">
                  Create your account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
