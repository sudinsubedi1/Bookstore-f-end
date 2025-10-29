import { useNavigate } from "react-router-dom"; 
import bannerImg from "../assets/Banner.png";

function Banner() {
  const navigate = useNavigate(); 

  return (
    <>
     
      <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 rounded-2xl shadow-md transition-colors duration-500">
        
    
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold leading-snug text-gray-900 dark:text-white">
              Hello, welcome here to learn something{" "}
              <span className="text-cyan-500 dark:text-cyan-400">new everyday!!!</span>
            </h1>

            <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300">
              Welcome to <span className="font-semibold text-cyan-600 dark:text-cyan-400">Learner</span>, 
              your daily gateway to knowledge and discovery. Dive into a vast 
              collection of books across every genre, meticulously curated to 
              inspire and educate.
            </p>
             <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300">
              For our <span className="font-semibold text-red-600 dark:text-red-400">Premium and paid</span>, 
                feature go throw premium below :
                
            </p>

           
            <button
              onClick={() => navigate("/course")}
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition duration-300 shadow-md dark:bg-cyan-600 dark:hover:bg-cyan-700"
            >
              Premium
            </button>
          </div>  
        </div>

        {/* Right Section - Image */}
        <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center">
          <img
            src={bannerImg}
            className="w-full md:w-[550px] h-auto md:h-[460px] rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
            alt="Learner app banner showing books and learning theme"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
