import { fetchCourses, fetchFirstModuleId } from "@/actions/courses";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const courseId = (await params).courseId;
  const data = await fetchCourses([courseId]);
  if (data?.length === 0) return notFound();

  const firstModuleId = await fetchFirstModuleId(courseId);
  redirect(`/course/${courseId}/lecture/${firstModuleId}/1`);
}
