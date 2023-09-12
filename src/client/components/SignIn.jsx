function SignIn() {
  return (
    <div className="fixed top-0 left-0 right-0 z-2 w-full h-full bg-[#414141] bg-opacity-60">
      <div class="relative w-full max-w-2xl max-h-full">
        <div class="relative w-[980px] h-[508px] pt-[22px] pb-[64px] bg-white flex items-center flex-col">
          <span className="flex justify-center items-center h-11 mb-16">
            <hr className="w-[120px] border-black" />
            <p className="text-3xl mx-5">Sign In</p>
            <hr className="w-[120px] border-black" />
          </span>
          <form className="flex justify-center items-center flex-col gap-8">
            <input
              placeholder="Email"
              className="w-[357px] h-[48px] border border-black pl-4"
              type="email"
            />
            <input
              placeholder="Password"
              className="w-[357px] h-[48px] border border-black pl-4"
              type="password"
            />
            <button className="bg-black w-[120px] h-8 text-white text-base">
              Sign in
            </button>
          </form>
          <p className="pt-14 text-base">
            New to Velox Forms?{" "}
            <u className="cursor-pointer">Create an account.</u>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
