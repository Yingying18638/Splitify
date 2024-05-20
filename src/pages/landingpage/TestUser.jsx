import { useSignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate,redirect } from "react-router-dom";
export default function SignInStep({ isGuest }) {
  const { signIn, isLoaded } = useSignIn();
//   const history = useHistory();
const navigate=useNavigate()
  useEffect(() => {
    async function createSignIn() {
      if (isGuest && isLoaded)
        await signIn.create({
          identifier: "guest+clerk_test@example.com",
          strategy: "password",
          password: "wpzwhpwscwyy",
        });

      console.log(signIn.status);
    //   window.location.reload()
    //   history.push("/dashboard");
    }
    createSignIn();
  }, [isGuest]);

  return (
    <>
      <div>The current sign in attempt status is {signIn.status}.</div>
    </>
  );
}
