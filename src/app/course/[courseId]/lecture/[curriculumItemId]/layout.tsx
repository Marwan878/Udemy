import { fetchUserField } from "@/actions/cart";
import { VideoTimestampProvider } from "@/contexts/video-timestamp";
import { notFound } from "next/navigation";
import Header from "./components/header";
import SideBar from "./components/side-bar/side-bar";
import VideoPlayer from "./components/video-player/video-player";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string; curriculumItemId: string }>;
}) {
  const { courseId, curriculumItemId } = await params;
  const userCourses = await fetchUserField("courses");
  if (!(courseId in userCourses)) {
    return notFound();
  }

  return (
    <>
      <Header courseId={courseId} />
      <main className="lg:flex w-full relative overflow-x-hidden">
        <VideoTimestampProvider>
          <div className="min-w-0 grow">
            <VideoPlayer
              courseId={courseId}
              curriculumItemId={curriculumItemId}
            />
            {children}
          </div>
        </VideoTimestampProvider>
        <SideBar />
      </main>
    </>
  );
}

export default Layout;
