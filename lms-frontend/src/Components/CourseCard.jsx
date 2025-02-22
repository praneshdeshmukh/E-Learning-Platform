import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();
    const fallbackImage = "/path/to/fallback-image.jpg"; // Add a fallback image in your assets

    return (
        <div
            onClick={() => navigate("/course/description/", { state: { ...data } })}
            className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-white"
        >
            <div className="overflow-hidden">
                <img
                    className="h-48 w-full  rounded-tl-lg rounded-tr-lg group-hover:scale-105 transition-all ease-in-out duration-300"
                    src={data?.thumbnail?.secure_url || fallbackImage}
                    alt={`${data?.title} thumbnail`}
                />
                <div className="p-3 space-y-1 text-black font-mono">
                    <h2 className="text-xl text-center font-bold text-yellow-900 line-clamp-2 p-3">{data?.title}</h2>
                    <p className="line-clamp-2  italic text-pretty font-semibold">{data?.description}</p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 pr-1">Category: </span>
                        {data?.category}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 pr-1 ">Total lectures: </span>
                        {console.log(data?.numberOfLectures)}
                        
                        {data?.numberOfLectures}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 pr-1 ">Instructor: </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
