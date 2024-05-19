import RegisterForm from "@/components/auth/register-form";
// import { SignUp } from "@clerk/nextjs";
 
// export default function Page() {
//   return <SignUp />;
// }

export const SignUpPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default SignUpPage;