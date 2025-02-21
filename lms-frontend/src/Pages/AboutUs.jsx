import aboutMainImage from "../assets/images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
    return (
        <HomeLayout>
            <div className="pl-4 md:pl-20 pt-20 flex flex-col text-white bg-black w-full min-h-screen">
                <div className="flex flex-col md:flex-row items-center gap-5 mx-10">
                    <section className="w-full md:w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide affordable and quality education to the world. We are providing a platform for aspiring teachers and students to share their skills, creativity, and knowledge to empower and contribute to the growth and wellness of mankind.
                        </p>
                    </section>
                    <div className="w-full md:w-1/2">
                        <img
                            id="test1"
                            style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
                            alt="About main image"
                            className="drop-shadow-2xl w-full"
                            src={aboutMainImage}
                        />
                    </div>
                </div>
                <div className="carousel w-full md:w-1/2 m-auto my-16">
                    {celebrities?.map((celebrity) => (
                        <CarouselSlide
                            {...celebrity}
                            key={celebrity.slideNumber}
                            totalSlides={celebrities.length}
                        />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default AboutUs;
// import aboutMainImage from "../Assets/Images/aboutMainImage.png";
// import CarouselSlide from "../Components/CarouselSlide";
// import { celebrities } from "../Constants/CelebrityData";
// import HomeLayout from "../Layouts/HomeLayout";

// function AboutUs() {
//     return (
//         <HomeLayout>
//             <div className="pl-20 pt-20 flex flex-col text-white bg-black w-full min-h-screen">
//                 <div className="flex items-center gap-5 mx-10">
//                     <section className="w-1/2 space-y-10">
//                         <h1 className="text-5xl text-yellow-500 font-semibold">
//                             Affordable and quality education
//                         </h1>
//                         <p className="text-xl text-gray-200">
//                             Our goal is to provide affordable and quality education to the world. 
//                             We are providing a platform for aspiring teachers and students to share
//                             their skills, creativity, and knowledge to empower and contribute
//                             to the growth and wellness of mankind.  
//                         </p>
//                     </section>

//                     <div className="w-1/2">
//                         <img
//                             id="test1"
//                             style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
//                             alt="about main image"
//                             className="drop-shadow-2xl"
//                             src={aboutMainImage}
//                         />
//                     </div>
//                 </div>

//                 <div className="carousel w-1/2 m-auto my-16">
//                     {celebrities && celebrities.map(celebrity => (
//                         <CarouselSlide 
//                             {...celebrity} 
//                             key={celebrity.slideNumber} 
//                             totalSlides={celebrities.length}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </HomeLayout>  
//     );
// }   

// export default AboutUs;



// import aboutMainImage from "../Assets/Images/aboutMainImage.png";
// import CarouselSlide from "../Components/CarouselSlide";
// import { celebrities } from "../Constants/CelebrityData";
// import HomeLayout from "../Layouts/HomeLayout";

// function AboutUs() {

//     return (
//         <HomeLayout>
//             <div className="pl-20 pt-20 flex flex-col text-white">
//                 <div className="flex items-center gap-5 mx-10">
//                     <section className="w-1/2 space-y-10">
//                         <h1 className="text-5xl text-yellow-500 font-semibold">
//                             Affordable and quality education
//                         </h1>
//                         <p className="text-xl text-gray-200">
//                             Our goal is to provide the afoordable and quality education to the world. 
//                             We are providing the platform for the aspiring teachers and students to share
//                             their skills, creativity and knowledge to each other to empower and contribute
//                             in the growth and wellness of mankind.  
//                         </p>
//                     </section>

//                     <div className="w-1/2">
//                         <img
//                             id="test1"
//                             style={{
//                                 filter: "drop-shadow(0px 10px 10px rgb(0,0,0));"
//                             }}
//                             alt="about main image"
//                             className="drop-shadow-2xl"
//                             src={aboutMainImage}
//                         />
//                     </div>
//                 </div>

//                 <div className="carousel w-1/2 m-auto my-16">
//                     {celebrities && celebrities.map(celebrity => (<CarouselSlide 
//                                                                     {...celebrity} 
//                                                                     key={celebrity.slideNumber} 
//                                                                     totalSlides={celebrities.length}
                                                                    
//                                                                 />))}
                    
//                 </div>


//             </div>
//         </HomeLayout>  
//     );
// }   


// export default AboutUs;
// import aboutMainImage from "../Assets/Images/aboutMainImage.png"
// import CarouselSlide from "../Components/CarouselSlide"
// import { celebrities } from "../Constants/CelebrityData";
// import HomeLayout from "../Layouts/HomeLayout";

// function AboutUs(){

//     return (
//         <HomeLayout>
//             <div className="lg:pl-20 pt-20 flex flex-col text-white  min-h-[90vh]">
//                 <div className="flex  flex-col lg:flex-row items-center gap-5 mx-10">
//                     <section className="lg:w-1/2 space-y-10">
//                         <h1 className=" text-5xl text-yellow-500  font-semibold">
//                             Affordable and quality education 
//                         </h1>
//                         <p className=" text-xl text-gray-200">
//                                 Our goal is to provide afoordable quality education to the world ,
//                                 we are providing the platform for the aspiring teachers and students to share 
//                                 their skills , creativity and knowledge to each other to empower and contribute 
//                                 in the growth and wellness of mankind.
//                         </p>
//                     </section>
//                     <div className="lg:w-1/2">
//                         <img
//                             id="test1"
//                             style={{
//                                 filter: "drop-shadow(0px 10px 10px rgb(0,0,0));"
//                             }}
//                             alt="about main image"
//                             className="drop-shadow-2xl"
//                             src={aboutMainImage}
//                         />
//                     </div>
//                 </div>

//                 <div className=" w-[80vw] carousel lg:w-1/2 m-auto my-16">
//                     {celebrities && celebrities.map(celebrity => (<CarouselSlide 
//                                                                     {...celebrity} 
//                                                                     key={celebrity.slideNumber} 
//                                                                     totalSlides={celebrities.length}
                                                                    
//                                                                 />))}
//                 </div>
//             </div>
//         </HomeLayout>
//     )
// }
// export default AboutUs;