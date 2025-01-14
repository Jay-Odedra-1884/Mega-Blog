import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function Protected({ children, authantication = true }) {
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authantication && authStatus !== authantication) {
      navigate("/login");
    } else if (!authantication && authStatus !== authantication) {
      navigate("/");
    }
    setLoading(false)
  }, [authStatus, navigator, authantication]);

  return loading ? <p>Loading...</p> : <>{children}</>
}
