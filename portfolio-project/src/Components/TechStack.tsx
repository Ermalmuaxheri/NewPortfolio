import Card from "../otherComponents/Card";
import Squares from "../ReactBits/Squares/Squares";

const TechStack = () => {
  return (
    <>
      <div className="h-[100vh] w-full relative bg-black">
        <Squares
          speed={0.2}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#fff"
        />
        <div className="absolute top-0  w-full h-full">
          <div className="flex bg-secondary rounded-3xl w-2/3 h-[600px] justify-self-center mt-[100px] p-10">
            <div className="w-full h-full text-text">
              <p className="text-4xl  text-center border-b">TECH STACK</p>
              <div className="m-10 flex gap-5">
                <Card text="" title="Languages" color="white" />
                <Card text="" title="Web Development" />
                <Card text="" title="Mobile Development" />
                <Card text="" title="Version Control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechStack;
