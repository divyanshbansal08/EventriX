import React from "react";
import { useParams } from "react-router-dom";
import councils from "../components_Councilspage/councils.js"

const CouncilDetails = () => {
  const { id } = useParams();
  const council = councils.find((e) => e.id.toString() === id);
  console.log(council);// Ensure ID comparison is correct

  if (!council) {
    return <h1 className="text-white text-center mt-10">Event Not Found</h1>;
  }

  return (
    <div className="bg-black">
      <div className="h-16 bg-black">
      </div>

      <div className="mx-32 mb-12 h-[55vh] ">
        <img className=" h-full w-full object fill " src={council.imgSrc}></img>
      </div>

      <div className=" flex text-white">
        <div className="flex-col mr-10 w-[80%] ml-32 text-3xl font-semibold">
          <div>{council.name},</div>
          <div>IIT Kanpur</div>
          <button className="bg-white rounded-2xl mt-10 text-black px-4 py-2 text-sm">SUBSCRIBE</button>
        </div>

        <div className="mt-4 ml-12 mr-32 mb-16">
          <p className="text-base">{council.description}</p>
        </div>

      </div>

      <p className="text-5xl text-white text-center font-semibold">
        Events By {council.name}
      </p>

      <p className=" text-white mt-6 bg-black text-center mx-64 text-sm"></p>

      <div className="mt-14  flex justify-center gap-14 ">
        <div className="bg-[#282424] h-[30rem] w-[27%] rounded-[50px] text-white">
          <img className="w-full h-72 object-fill rounded-t-[50px]" alt="" src="sntlogo.jpg" />
          <p className="text-3xl pl-10 text-wrap pt-5">Music Club</p>
          <p className="pl-10 text-wrap text-sm pt-3"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit dolorum iusto magnam porro hic </p>
          <p className="pl-10 pt-5 text-base pb-2">View Event </p>
        </div>

        <div className="bg-[#282424] h-[30rem] w-[27%] rounded-[50px] text-white">
          <img className="w-full h-72 object-fill rounded-t-[50px]" alt="" src="sntlogo.jpg" />
          <p className="text-3xl pl-10 text-wrap pt-5">Music Club</p>
          <p className="pl-10 text-wrap text-sm pt-3"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit dolorum iusto magnam porro hic </p>
          <p className="pl-10 pt-5 text-base pb-2">View Event </p>
        </div>

        <div className="bg-[#282424] h-[30rem] w-[27%] rounded-[50px] text-white">
          <img className="w-full h-72 object-fill rounded-t-[50px]" alt="" src="sntlogo.jpg" />
          <p className="text-3xl pl-10 text-wrap pt-5">Music Club</p>
          <p className="pl-10 text-wrap text-sm pt-3"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit dolorum iusto magnam porro hic </p>
          <p className="pl-10 pt-5 text-base pb-2">View Event </p>
        </div>

      </div>

      <div className="w-full mt-20">
        <button className="block mx-auto bg-[#282424] text-white px-4 py-2 rounded-3xl ">View all</button>
      </div>


      <div className="">
        <p className="text-white pl-28 mt-12  text-4xl ">Merchandise</p>
        {/* <div className="mt-14  flex justify-center gap-14  w-[80%] m-auto ">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
 
      </div> */}
      </div>
      <div className="mt-16 flex justify-between w-full ">
        <p className="text-5xl text-white ml-20">Coordinators</p>
        <div className="w-[50%] flex-col items-center">
          <div className="text-white ml-11  h-52 flex mb-12">
            <img className="object-fill w-[33%] h-[90%] rounded-[50%]" src="sntlogo.jpg"></img>
            <div className="pl-8">
              <p className="text-4xl font-semibold mt-6">Full name
              </p>
              <p className="mt-6 text-sm">Club Coordinator</p>
            </div>
          </div>
          <div className="text-white ml-11  h-52 flex mb-12">
            <img className="object-fill w-[33%] h-[90%] rounded-[50%]" src="sntlogo.jpg"></img>
            <div className="pl-8">
              <p className="text-4xl font-semibold mt-6">Full name
              </p>
              <p className="mt-6 text-sm">Club Coordinator</p>
            </div>
          </div>
          <div className="text-white ml-11  h-52 flex mb-12">
            <img className="object-fill w-[33%] h-[90%] rounded-[50%]" src="sntlogo.jpg"></img>
            <div className="pl-8">
              <p className="text-4xl font-semibold mt-6">Full name
              </p>
              <p className="mt-6 text-sm">Club Coordinator</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[40vh] w-full bg-[#282424] text-white mt-12 pl-16">
        <p className="text-5xl pt-12">Stay Updated on Events!</p>
        <p className="pt-5"> Sign up now to recieve exclusive updates and special offers for upcoming events!
        </p>
        <div className="flex pt-5 gap-8 text-sm">
          <button
            class="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-[#1E3E62] rounded-md group"
          >
            <span
              class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#16273d] rounded group-hover:-mr-4 group-hover:-mt-4"
            >
              <span
                class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#282424]"
              ></span>
            </span>
            <span
              class="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#16273d] rounded group-hover:-ml-4 group-hover:-mb-4"
            >
              <span
                class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#282424]"
              ></span>
            </span>
            <span
              class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#03346E] rounded-md group-hover:translate-x-0"
            ></span>
            <span
              class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
            >Get Started</span
            >
          </button>
          <button className="bg-[#36373a] w-28 h-12 rounded-3xl"> Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default CouncilDetails;
