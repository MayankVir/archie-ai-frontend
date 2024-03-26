import { useTypewriter } from "react-simple-typewriter";

const TypewriterEffect = ({ words }) => {
  const [typeEffect] = useTypewriter({
    words,
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 50,
  });

  return <span>{typeEffect}</span>;
};

export default TypewriterEffect;
