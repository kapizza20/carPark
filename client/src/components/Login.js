import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../hooks/useAuth';

import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate=useNavigate();
    const location=useLocation();
    const from=location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ Username:user, Pwd:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            
            if(response?.data!=null){
            const Username = response?.data?.Username;
            const IDPrivilegije = response?.data?.IDPrivilegije;
            setAuth({ Username, IDPrivilegije });
            setUser('');
            setPwd('');
            navigate("/")
            }else{
               setErrMsg('Пријављивање није успело');
               errRef.current.focus();
            }
        } catch (err) {
                setErrMsg('Пријављивање није успело, јавио се проблем на мрежи позовите администратора');
            errRef.current.focus();
        }
    }

    return (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className='backBlack'>Пријави се</h1>
                    <form onSubmit={handleSubmit}>
                        <label  className="regLab" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label className="regLab" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Пријави се</button>
                    </form>
                </section>
            )}
        
export default Login