import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

import { useNavigate,useLocation} from "react-router-dom";

const USER_REGEX = /^[A-z0-9-_]{5,30}$/;
const PWD_REGEX = /^[A-z0-9-_]{5,30}$/;
const REGISTER_URL = '/register';

const Register = () => {

    const location = useLocation();
    const navigate=useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

   
   const [tipNaloga, setTipNaloga] = useState('2');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleChangeTip = (event) => {
      console.log(event.target.value)
    setTipNaloga(event.target.value)
   }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Неважећи унос");
            return;
        }
        try {
         console.log(user,pwd);
            const response = await axios.post(REGISTER_URL,
               JSON.stringify({ Username:user, Pwd:pwd,IDPrivilegije:tipNaloga }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            console.log("ERROR",JSON.stringify(err));
            if (!err?.response) {
                setErrMsg('Сервер не одговара');
            } else if (err.response?.status === 409) {
                setErrMsg('Username заузет, пробајте други');
            } else {
                setErrMsg('Регистрација није успела')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Успешно!</h1>
                    <p>
                        <a href="#">Пријави се</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Регистрација</h1>
                    <form className="regForm" onSubmit={handleSubmit}>
                        <label className="regLab" htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            5 до 30 карактера.<br />
                        </p>


                        <label className="regLab" htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            5 до 30 карактера.<br />
                        </p>

                        <br/>
                        <label htmlFor="confirm_pwd">
                            Потврдите Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Лозинке се не подударају.
                        </p>

                        <label className="regLab" htmlFor="confirm_pwd">
                            Изабери тип налога:
                        </label>
                        
                        Администратор
                        <input type="radio" name="tip" id="1" value='1' checked={tipNaloga === '1'}
                        onChange={handleChangeTip}/>
                        Дежурни<input type="radio" name="tip" id="2" value='2' checked={tipNaloga === '2'}
                        onChange={handleChangeTip}/>

                        <button disabled={!validName || !validPwd || !validMatch || !tipNaloga ? true : false}>Региструј се</button>
                    </form>
                    <p>
                        Већ сте регистровани?<br />
                        <button onClick={()=>
                         navigate("/login")
                        } className="line">
                            {/*put router link here*/}
                           Пријави се
                        </button>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register