import { Button } from "@/components/general";

export default function Certificates() {
  return (
    <div className="border-t border-[#d1d2e0] p-[2.4rem] flex">
      <dt className="w-1/4">Certificates</dt>
      <dd className="max-sm:ps-[0.8rem] w-3/4 ">
        <p>Get Udemy certificate by completing entire course</p>
        <Button
          variant="secondary"
          height="md"
          disabled
          className="cursor-not-allowed opacity-50 mt-[1.6rem] heading-sm"
          style={{ minWidth: "50%" }}
        >
          Udemy certificate
        </Button>
      </dd>
    </div>
  );
}
