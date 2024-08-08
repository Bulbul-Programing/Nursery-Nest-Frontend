import { CSSProperties } from "react";

interface CustomCSSProperties extends CSSProperties {
  "--value"?: string | number;
  "--size"?: string | number;
  "--thickness"?: string | number;
}

const Dashboard = () => {
  const customStyle: CustomCSSProperties = {
    "--value": "70",
    "--size": "8rem",
    "--thickness": "1rem",
  };
  return (
    <div className="grid grid-cols-2">
      <div className="rounded-xl bg-[url('https://i.ibb.co/GdCJ2Q5/goal.jpg')] bg-cover bg-center">
        <div className="rounded-xl p-5 flex justify-between items-center bg-gradient-to-r from-[#0040a6]/50 to-blue-500/80">
          <div className=" w-2/3 text-white">
            <p className="text-2xl my-2 font-bold">
              Great! Your goal is almost complete
            </p>
            <p>
              Great! Your goal is almost complete You have completed 61% of your
              target. You can view the work details.
            </p>
          </div>
          <div
            className="radial-progress text-white "
            style={customStyle}
            role="progressbar"
          >
            70%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
