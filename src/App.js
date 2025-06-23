import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Provider } from "react-redux";
import {store} from "./app/store";

function App(){
  return (
    <Provider store={store}>
      <AppRouter/>
      <ToastContainer position="top-right" autoClose={3000}/>
    </Provider>
  );
}

export default App;
