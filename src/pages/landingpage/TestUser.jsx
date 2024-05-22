import { useSignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
export default function SignInStep({ isGuest }) {
  const { signIn, isLoaded } = useSignIn();
  useEffect(() => {
    async function createSignIn() {
      if (isGuest && isLoaded) {
        await signIn.create({
          identifier: "guest+clerk_test@example.com",
          strategy: "password",
          password: "wpzwhpwscwyy",
        });
        if (signIn.status === "complete") {
          window.location.reload();
        }
      }
      console.log(signIn.status);
    }
    createSignIn();
  }, [isGuest]);

  return null;
}
