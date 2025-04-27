export default function Description({
  requirements,
  whatYouWillLearn,
  whoThisCourseIsFor,
  leadHeadline,
}: {
  requirements: string[];
  whatYouWillLearn: string[];
  whoThisCourseIsFor: string[];
  leadHeadline: string;
}) {
  return (
    <div className="border-t border-[#d1d2e0] p-[2.4rem] flex">
      <dt className="w-1/4">Description</dt>
      <dd>
        <p className="mb-2">{leadHeadline}</p>
        <div>
          <h4 className="mb-1 heading-sm">What you&apos;ll learn</h4>
          <ul>
            {whatYouWillLearn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mt-6 mb-1 heading-sm">
            Are there any course requirements or prerequisites?
          </h4>
          <ul>
            {requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mt-[2.4rem] mb-[0.4rem] heading-sm">
            Who this course is for:
          </h4>
          <ul>
            {whoThisCourseIsFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </dd>
    </div>
  );
}
