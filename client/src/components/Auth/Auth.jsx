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
      <div className="container-auth">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={(e) => e.preventDefault()}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button className="button login__submit" onClick={login}>
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            {loginError && <div className="error-message">{loginError}</div>}
            <div className="social-login">
              <h3>log in via</h3>
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
