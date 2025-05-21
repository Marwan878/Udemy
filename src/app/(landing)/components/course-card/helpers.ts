import { CART_LOCAL_STORAGE_KEY } from "@/constants";
import {
  localStorageEntryIsNotCorrupted,
  localStorageKeyExists,
} from "@/lib/utils";

function addCourseIdToLocalStorage(courseId: string) {
  if (
    localStorageKeyExists(CART_LOCAL_STORAGE_KEY) &&
    localStorageEntryIsNotCorrupted(CART_LOCAL_STORAGE_KEY)
  ) {
    localStorage.setItem(
      CART_LOCAL_STORAGE_KEY,
      JSON.stringify([
        ...JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY) || "[]"),
        courseId,
      ])
    );
  } else {
    localStorage.setItem("cart", JSON.stringify([courseId]));
  }
}

export { addCourseIdToLocalStorage };
