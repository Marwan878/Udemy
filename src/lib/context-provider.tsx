"use client";

import { addToCart as addToCartAPI, getLoggedInUserId } from "@/actions/cart";
import { fetchCourses } from "@/actions/courses";
import { fetchUserCart } from "@/actions/user";
import { addCourseIdToLocalStorage } from "@/components/course-card/helpers";
import { CART_LOCAL_STORAGE_KEY } from "@/constants";
import { TCourse } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { localStorageKeyExists } from "./utils";

const AppContext = createContext<{
  cartCoursesIds: string[];
  setCartCoursesIds: React.Dispatch<React.SetStateAction<string[]>>;
  addToCart: (courseId: string) => Promise<void>;
}>({
  cartCoursesIds: [],
  setCartCoursesIds: () => {},
  addToCart: () => {},
});

function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartCoursesIds, setCartCoursesIds] = useState<string[]>([]);
  const [cart, setCart] = useState<TCourse[]>([]);

  async function addToCart(courseId: string) {
    const loggedInUser = await getLoggedInUserId();
    if (loggedInUser) {
      await addToCartAPI(courseId);
    } else {
      addCourseIdToLocalStorage(courseId);
    }
    setCartCoursesIds((curr) => [...curr, courseId]);
  }

  useEffect(() => {
    const handleAppStart = async () => {
      const userId = await getLoggedInUserId();
      if (userId) {
        const cart = await fetchUserCart();
        setCart(cart);
      } else {
        if (localStorageKeyExists(CART_LOCAL_STORAGE_KEY)) {
          const parsedValue = JSON.parse(
            window.localStorage.getItem(CART_LOCAL_STORAGE_KEY)
          );
          if (
            // A simple check that the local storage coursesIds is properly structured
            Array.isArray(parsedValue) &&
            parsedValue.every((item) => typeof item === "string")
          ) {
            const courses = await fetchCourses(parsedValue);
            setCart(courses);
          } else {
            window.localStorage.setItem(
              CART_LOCAL_STORAGE_KEY,
              JSON.stringify([])
            );
          }
        }
      }
    };

    handleAppStart();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartCoursesIds,
        setCartCoursesIds,
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useAppContext was used outside AppContextProvider");
  return context;
}

export { AppProvider, useAppContext };
