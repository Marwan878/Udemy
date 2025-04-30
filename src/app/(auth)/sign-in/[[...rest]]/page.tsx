"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "my-auto w-full",
          cardBox: "lg:w-2/3",
        },
        variables: {
          fontSize: "1.3rem",
        },
      }}
    />
  );
}
