const SignInInstruction = () => {
  const caption = "Please Sign In to use the apps!";
  return (
    <div
      className="text-xl font-bold min-h-screen flex items-center
          justify-center mt-[-100px] text-default-black italic"
    >
      {caption}
    </div>
  );
};

export default SignInInstruction;
