import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/features/userSlice";
import buildingSlice from "./store/features/buildingSlice";
import './App.css?version=1.1';
import AppRoutes from './appRoutes';

function App() {

  const myStore = configureStore({
    reducer: {
      userSlice,
      buildingSlice,
    }
  });

  // useEffect(() => {
  //   // componentWillUnmount -> כמו
  //   return () => {
  //     // יפעיל את הפונקציה ברגע שהקומפ נעלם
  //     // או החלפת לינק או שהקומפ הוא פריט ברשימה
  //     // ריאקטבית כגון רשימת קניות /קופה וכו
  //     alert("about comp unmount")
  //   }
  // },[])

  return (
    <Provider store={myStore}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
