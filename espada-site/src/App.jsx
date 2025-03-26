import { Outlet} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Outlet/>
    </div>
  );
}
