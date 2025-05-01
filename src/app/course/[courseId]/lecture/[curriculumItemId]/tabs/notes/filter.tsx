import { ChevronDown } from "lucide-react";

export default function Filter() {
  //   const [optionsAreVisible, setOptionsAreVisible] = useState();
  return (
    <>
      <button className="btn-md btn-secondary btn heading-sm px-[1.2rem]">
        All lectures <ChevronDown color="#6d28d2" />
      </button>
      {/* {optionsAreVisible} */}
    </>
  );
}
