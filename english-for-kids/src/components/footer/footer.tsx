import React from 'react';
import './footer.css';
import rsLogo from '../../assets/rslogo.svg';

export const Footer = (): React.ReactElement => {
  return (
    <footer className="footer  --bs-blue">
      <a href="https://github.com/rolling-scopes-school/andreikaptsiuh-JSFE2021Q1">My GitHub</a>
      <div className="rs-content">
        <img src={rsLogo} className="rs-logo" alt="rs-logo" />
        <a href="https://rs.school/">To RS School</a>
      </div>
      <p>2021</p>
    </footer>
  );
};
