"use client";

import { fileFromImageUrl } from "@/lib/utils";
import { TCourse, TModule } from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const CourseManagementContext = createContext<{
  courseData: TCourse;
  setCourseData: Dispatch<SetStateAction<TCourse>>;
  courseImage: File | undefined;
  setCourseImage: Dispatch<SetStateAction<File | undefined>>;
  modules: TModule[];
  setModules: Dispatch<SetStateAction<TModule[]>>;
}>({});

export function CourseManagementProvider({
  children,
  courseData: _courseData,
  modules: _modules,
}: {
  children: ReactNode;
  courseData: TCourse;
  modules: TModule[];
}) {
  const [courseData, setCourseData] = useState<TCourse>(_courseData);
  const [modules, setModules] = useState<TModule[]>(_modules);
  const [courseImage, setCourseImage] = useState<File>();

  useEffect(() => {
    const handleLoadImage = async () => {
      if (!courseData.imageUrl) return;

      const file = await fileFromImageUrl(
        courseData.imageUrl,
        "course-image.jpg"
      );
      setCourseImage(file);
    };
    handleLoadImage();
  }, [courseData.imageUrl]);

  return (
    <CourseManagementContext.Provider
      value={{
        courseData,
        setCourseData,
        courseImage,
        setCourseImage,
        modules,
        setModules,
      }}
    >
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
