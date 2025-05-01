export default function Features() {
  return (
    <div className="border-t border-[#d1d2e0] p-[2.4rem] flex">
      <dt className="w-1/4">Features</dt>
      <dd className="ps-2 w-3/4">
        <p>
          Available on{" "}
          <a
            className="font-bold underline underline-offset-[0.4rem] decoration-[#af72fd] text-udemy-purple"
            href=""
          >
            iOS
          </a>{" "}
          and{" "}
          <a
            className="font-bold underline underline-offset-[0.4rem] decoration-[#af72fd] text-udemy-purple"
            href=""
          >
            Android
          </a>
        </p>
      </dd>
    </div>
  );
}
