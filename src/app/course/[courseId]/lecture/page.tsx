import { fetchModulesWithContent } from "@/actions/courses";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const courseId = (await params).courseId;
  const modules = await fetchModulesWithContent(courseId);
  if (!modules || !modules.length) return notFound();

  redirect(`/course/${courseId}/lecture/${modules[0].content[0].id}`);
}
