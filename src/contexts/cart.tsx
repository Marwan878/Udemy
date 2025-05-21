"use client";

import { addToCart as addToCartAPI, getLoggedInUserId } from "@/actions/cart";
import { fetchCourses } from "@/actions/courses";
import { fetchUserCart } from "@/actions/user";
import { addCourseIdToLocalStorage } from "@/app/(landing)/components/course-card/helpers";
import { CART_LOCAL_STORAGE_KEY } from "@/constants";
import { TCourse, TUser } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<{
  cartCoursesIds: string[];
  addToCart: (course: TCourse & { instructor: TUser }) => Promise<void>;
  cart: (TCourse & { instructor: TUser })[] | null;
  setCart: Dispatch<SetStateAction<(TCourse & { instructor: TUser })[] | null>>;
}>({
  cartCoursesIds: [],
  addToCart: async () => {},
  cart: null,
  setCart: () => {},
});

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<(TCourse & { instructor: TUser })[] | null>(
    null
  );
  const cartCoursesIds = cart?.map((course) => course.id) ?? [];

  async function addToCart(course: TCourse & { instructor: TUser }) {
    const loggedInUser = await getLoggedInUserId();
    if (loggedInUser) {
      const formData = new FormData();
      formData.append("courseId", course.id);
      await addToCartAPI(formData);
    } else {
      addCourseIdToLocalStorage(course.id);
    }

    setCart((curr) => [...(curr ?? []), course]);
  }

  useEffect(() => {
    const handleAppStart = async () => {
      const userId = await getLoggedInUserId();
      if (userId) {
        const cart = await fetchUserCart();
        setCart(cart);
      } else {
        const parsedValue = JSON.parse(
          window.localStorage.getItem(CART_LOCAL_STORAGE_KEY) ?? "[]"
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
    };

    handleAppStart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCoursesIds,
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("useCart was used outside CartProvider");
  return context;
}

export { CartProvider, useCart };
