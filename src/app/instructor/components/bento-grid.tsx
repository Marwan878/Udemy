import Image from "next/image";
import Link from "next/link";

export function BentoGrid() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-lg border p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 flex justify-center">
          <Image
            src="/images/instructor-page-bento/engaging-course-2x.webp"
            alt="Person creating an online course"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
        <div className="md:w-2/3 space-y-4">
          <h1 className="text-xl font-bold mb-8 text-gray-800">
            Create an Engaging Course
          </h1>
          <p className="mb-8">
            Whether you've been teaching for years or are teaching for the first
            time, you can make an engaging course. We've compiled resources and
            best practices to help you get to the next level, no matter where
            you're starting.
          </p>
          <div>
            <Link
              href="#"
              className="inline-block text-purple-600 font-medium hover:text-purple-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Two Column Features */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Feature */}
        <section className="bg-white rounded-lg border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/images/instructor-page-bento/video-creation-2x.webp"
              alt="Person recording video lectures"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="md:w-3/5 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Get Started with Video
            </h2>
            <p className="mb-8">
              Quality video lectures can set your course apart. Use our
              resources to learn the basics.
            </p>
            <div>
              <Link
                href="#"
                className="inline-block text-purple-600 font-medium hover:text-purple-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Audience Feature */}
        <section className="bg-white rounded-lg border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/images/instructor-page-bento/build-audience-2x.webp"
              alt="Person building an audience"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="md:w-3/5 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Build Your Audience
            </h2>
            <p className="mb-8">
              Set your course up for success by building your audience.
            </p>
            <div>
              <Link
                href="#"
                className="inline-block text-purple-600 font-medium hover:text-purple-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Challenge Section */}
      <section className="bg-white rounded-lg border p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 flex justify-center">
          <Image
            src="/images/instructor-page-bento/newcomer-challenge-2x.webp"
            alt="Instructor challenge illustration"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Join the New Instructor Challenge!
          </h2>
          <p className="mb-8">
            Get exclusive tips and resources designed to help you launch your
            first course faster! Eligible instructors who publish their first
            course on time will receive a special bonus to celebrate. Start
            today!
          </p>
          <div>
            <Link
              href="#"
              className="inline-block text-purple-600 font-medium hover:text-purple-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
