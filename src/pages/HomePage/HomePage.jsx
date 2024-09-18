import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const HomePage = () => {
   const navigate = useNavigate();
   const [user] = useAuthState(auth);
   if (user) {
      return navigate("/admin");
   } else return navigate("/login");
};

export default HomePage;
