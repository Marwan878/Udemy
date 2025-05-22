import { CART_LOCAL_STORAGE_KEY } from "@/constants";
import { isStringArray } from "@/lib/utils";

function addCourseIdToLocalStorage(courseId: string) {
  const value = JSON.parse(
    localStorage.getItem(CART_LOCAL_STORAGE_KEY) ?? "[]"
  );
  if (!value || !isStringArray(value)) {
    localStorage.setItem("cart", JSON.stringify([courseId]));
    return;
  }

  localStorage.setItem(
    CART_LOCAL_STORAGE_KEY,
    JSON.stringify([...value, courseId])
  );
}

export { addCourseIdToLocalStorage };
