import { Button, Input } from "@/components/general";
import About from "./about";
import { fetchUser, updateUserData } from "@/actions/user";

export default async function Page() {
  const { about, firstName, lastName, bio } = await fetchUser();

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 min-h-screen mb-8"
      action={updateUserData}
    >
      <div>
        {/* First column fields */}
        <div className="mb-6">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            className="w-full"
            defaultValue={firstName}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            className="w-full"
            defaultValue={lastName}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Bio
          </label>
          <div className="relative">
            <Input
              id="bio"
              name="bio"
              className="w-full"
              limit={60}
              defaultValue={bio}
            />
          </div>
        </div>
        <About defaultValue={about} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
