import LoginForm from "@/components/auth/login-form";
// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return <SignIn />;
// }

export const SignInPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default SignInPage;
