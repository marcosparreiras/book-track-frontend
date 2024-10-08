import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user";
import { useEffect } from "react";

type Actions = {
  "not-user": () => void;
  user: () => void;
  admin: () => void;
};

export function useAuth(permission: keyof Actions) {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const actions: Actions = {
    "not-user": () => {
      if (user) {
        navigate("/");
      }
    },
    user: () => {
      if (!user) {
        navigate("/signin");
      }
    },
    admin: () => {
      if (!user || !user.isAdmin) {
        navigate("/");
      }
    },
  };

  useEffect(() => {
    actions[permission]();
  }, [user, navigate]);
}
