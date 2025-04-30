import { UserButton as ClerkUserButton } from "@clerk/nextjs";

export default function UserButton() {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          rootBox: "hidden lg:block w-6 h-6 ms-3",
          avatarBox: "w-6 h-6",
        },
      }}
    />
  );
}
