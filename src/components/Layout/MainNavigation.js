import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  const isLoggedIn = ctx.isLoggedIn;

  const logoutHandler = () => {
    ctx.logout();
  };

  useEffect(() => {
    if (isLoggedIn) {
      const logoutTimer = setTimeout(() => {
        ctx.logout();
      }, 300000);
      return () => clearTimeout(logoutTimer);
    }
  }, [isLoggedIn, ctx]);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
