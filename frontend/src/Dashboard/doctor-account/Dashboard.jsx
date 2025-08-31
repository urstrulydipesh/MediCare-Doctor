// import React from "react";
// import Loader from "../../components/Loader/Loading";
// import Error from "../../components/Error/Error";
// import useGetProfile  from "../../hooks/useFetchData";
// import { BASE_URL } from "../../config";
// import Tabs from "./Tabs"; // make sure this path is correct

// const Dashboard = () => {
//   const [tab, setTab] = useState("overview"); // default tab state
//   const { data, loading, error } = useGetProfile(`${BASE_URL}/doctor/profile/me`);

//   return (
//     <section>
//       <div className="max-w-[1170px] px-5 mx-auto">
//         {loading && !error && <Loader />}
//         {error && !loading && <Error />}

//         {!loading && !error && (
//           <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
//             <Tabs tab={tab} setTab={setTab} />
//             <div className="lg:col-span-2">
//               {data?.isApproved === "pending" && (
//                 <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
//                   <svg
//                     aria-hidden="true"
//                     className="flex-shrink-0 w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 
//                       0116 0zm-7-4a1 1 0 11-2 0 1 
//                       1 0 012 0zM9 9a1 1 0 000 
//                       2v3a1 1 0 001 1h1a1 1 0 
//                       100-2v-3a1 1 0 00-1-1H9z"
//                     ></path>
//                   </svg>
//                   <span className="ml-2">Your profile is pending approval.</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Dashboard;



// import React, { useState } from "react";
// import Loader from "../../components/Loader/Loading";
// import Error from "../../components/Error/Error";
// import useFetchData from "../../hooks/useFetchData";
// import { BASE_URL } from "../../config";
// import Tabs from "./Tabs";

// const Dashboard = () => {
//   const [tab, setTab] = useState("overview");
//   const { data, loading, error } = useFetchData(`${BASE_URL}/doctor/profile/me`);

//   return (
//     <section>
//       <div className="max-w-[1170px] px-5 mx-auto">
//         {loading && !error && <Loader />}
//         {error && !loading && <Error errMessage={error} />}

//         {!loading && !error && data && (
//           <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
//             <Tabs tab={tab} setTab={setTab} />
//             <div className="lg:col-span-2 p-6 bg-white shadow rounded-md">
//               {data.isApproved === "pending" && (
//                 <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
//                   <svg
//                     aria-hidden="true"
//                     className="flex-shrink-0 w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                   <span className="ml-2">Your profile is pending approval.</span>
//                 </div>
//               )}

//               {/* Tab Content */}
//               {tab === "overview" && (
//                 <div>
//                   <h2 className="text-xl font-semibold mb-2">Overview</h2>
//                   <p>Welcome {data.name || "Doctor"} 👋</p>
//                   <p>Status: {data.isApproved || "unknown"}</p>
//                 </div>
//               )}
//               {/* ... rest of your tab content ... */}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Dashboard;



import { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );

  const [tab, setTab] = useState("overview");

  return (
    <section>
        <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;