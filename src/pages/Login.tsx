import React from "react";

const LogInPage = ({
  loginWithFireBase,
}: {
  loginWithFireBase: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
}) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Email" onChange={handleEmailChange} />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <button
        onClick={() => {
          loginWithFireBase({ email, password });
        }}
      >
        Log In
      </button>
    </div>
  );
};

export default LogInPage;
