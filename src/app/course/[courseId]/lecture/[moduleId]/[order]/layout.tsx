import { fetchUserField } from "@/actions/cart";
import { notFound } from "next/navigation";
import Header from "./components/header";
import SideBar from "./components/side-bar/side-bar";
import VideoPlayer from "./components/video-player/video-player";
import { VideoTimestampProvider } from "@/contexts/video-timestamp";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string; moduleId: string; order: string }>;
}) {
  const { courseId, moduleId, order } = await params;
  const userCourses = await fetchUserField("courses");
  if (!(courseId in userCourses)) {
    return notFound();
  }

  return (
    <>
      <Header courseId={courseId} />
      <main className="md:flex w-full">
        <VideoTimestampProvider>
          <div className="min-w-0 grow">
            <VideoPlayer
              courseId={courseId}
              moduleId={moduleId}
              order={+order}
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
