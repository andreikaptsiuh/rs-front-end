import React, { useContext, useState } from 'react';
import { ShowModal } from '../../context';
import { loginUser } from '../../shared/api';
import './login-modal.css';

type LoginModalProps = {
  logHandler(): void;
  login(): void;
};

export const LoginModal: React.FC<LoginModalProps> = (props: LoginModalProps) => {
  const showModal = useContext(ShowModal);

  const [log, setLog] = useState('');
  const [pass, setPass] = useState('');
  const [noLog, setNoLog] = useState(false);

  const login = async (): Promise<void> => {
    const res = await loginUser(log, pass);
    if (res) {
      props.login();
      setNoLog(false);
    } else setNoLog(true);
  };

  return (
    <div className={`login-modal ${showModal ? '' : 'close'}`}>
      <div className="modal">
        <h2 className="modal-title">Login</h2>
        <input
          className="modal-input"
          type="text"
          value={log}
          onChange={(event) => setLog(event.target.value)}
          placeholder="Login"
        />
        <input
          className="modal-input"
          type="text"
          value={pass}
          onChange={(event) => setPass(event.target.value)}
          placeholder="Password"
        />

        <div className="modal-buttons">
          <button onClick={props.logHandler} type="button" className="modal-btn">
            Cancel
          </button>
          <button onClick={login} type="button" className="modal-btn">
            Login
          </button>
        </div>

        {noLog ? <p className="modal-message">*You must write right login and password</p> : ''}
      </div>
    </div>
  );
};
