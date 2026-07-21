import type { ReactNode } from "react";
import "../../styles/auth.css";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>{title}</h1>

          <p>{subtitle}</p>

        </div>

        {children}

      </div>

    </div>
  );
};

export default AuthLayout;