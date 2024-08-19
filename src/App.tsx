import { useEffect } from "react";
import "./App.css";
import MainLayout from "./components/MainLayout/MainLayout";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { useTotalVisitorQuery } from "./redux/Product/ProductAPI";

function App() {
  const cartItems = useAppSelector(
    (state: RootState) => state.addToCart.products
  );
  const {data} = useTotalVisitorQuery(undefined)
  console.log(data);
  useEffect(() => {
    if (cartItems.length > 1) {
      return;
    }
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message =
        "Are you sure you want to leave? Changes you made may not be saved.";
      event.preventDefault();
      event.returnValue = message; // Some browsers may not display this custom message.
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);
 
  return (
    <>
      <MainLayout></MainLayout>
    </>
  );
}

export default App;
