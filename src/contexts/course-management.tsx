"use client";

import { TCourse } from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const CourseManagementContext = createContext<{
  courseData: TCourse;
  setCourseData: Dispatch<SetStateAction<TCourse>>;
}>({});

export function CourseManagementProvider({
  children,
  courseData: _courseData,
}: {
  children: ReactNode;
  courseData: TCourse;
}) {
  const [courseData, setCourseData] = useState<TCourse>(_courseData);

  return (
    <CourseManagementContext.Provider value={{ courseData, setCourseData }}>
      {children}
    </CourseManagementContext.Provider>
  );
}

export function useCourseManagement() {
  const context = useContext(CourseManagementContext);
  if (!context)
    throw new Error("useCourseForm must be used within a CourseFormProvider");
  return context;
}
