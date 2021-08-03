import React from 'react';

type LoginButtonProps = {
  logHandler(): void;
};

export const LoginButton: React.FC<LoginButtonProps> = (props: LoginButtonProps) => {
  return (
    <button onClick={props.logHandler} className="login-btn" type="button">
      Login
    </button>
  );
};
