"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          cardBox: "w-full",
          rootBox: "my-auto",
        },
        variables: {
          fontSize: "1.3rem",
        },
      }}
    />
  );
}
