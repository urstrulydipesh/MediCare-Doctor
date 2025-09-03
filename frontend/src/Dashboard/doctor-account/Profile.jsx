import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    bio:'',
    gender:'',
    specialization:'',
    ticketPrice:0, 
     qualifications:[{ starttingDate:"", endingDate:"", degree:"", university:""}],
     experiences:[{ starttingDate:"", endingDate:"", position:"", hospital:""}],
     timeSlots:[{ day:"", startingTime:"", endingTime:""}],
     about:'',
      photo:null,
  })

  const handleInputChange = e => { 
       setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleFileInputChange = e => {} ;

  const updateProfileHandler = async e => {
    e.preventDefault();
  };

// reuseable function to add items dynamically
const addItems = (key, item) => {

  setFormData(prevFormData => ({...prevFormData, [key]:[...prevFormData[key], item]}))
}

  const addQualificationHandler = e => {
    e.preventDefault()

    addItems('qualifications', {
     starttingDate:"", endingDate:"", degree:"", university:""
    })
  }

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="Enter your name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            placeholder="Email address"
            className="form__input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input 
            type="number" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange} 
            placeholder="Phone number"
            className="form__input"
          />
        </div> 
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input 
            type="text" 
            name="bio" 
            value={formData.bio} 
            onChange={handleInputChange} 
            placeholder="Bio "
            className="form__input"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
  <div className="grid grid-cols-3 gap-5 mb-[30px]">
    <div>
      <p className="form__label">Gender*</p>
      <select 
        name="gender" 
        value={formData.gender} 
        onChange={handleInputChange} 
        className="form__input py-3.5"
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div>
    <p className="form__label">Specialization*</p>
      <select 
        name="specialization" 
        value={formData.specialization} 
        onChange={handleInputChange} 
        className="form__input py-3.5"
      >
        <option value="">Select</option>
        <option value="surgeon">Surgeon</option>
        <option value="neurologist">Neurologist</option>
        <option value="dermatologist">Dermatologist</option>
      </select>
  </div>

<div>
  <p className="form__label">Ticket Price*</p>
  <input 
    type="number"
    placeholder="100"
    name="ticketPrice"
    value={formData.ticketPrice}
    className="form__input"
    onChange={handleInputChange}
  />
</div>
</div>
</div>

<div className="mb-5">
  <p className="form__label">Qualifications*</p>
  {formData.qualifications?.map((item, index) => (
  <div key={index}>
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="form__label">Starting Date*</p>
          <input
            type="date"
            name="startingDate"
            value={item.startingDate}
            className="form__input"
          />
        </div>
        <div>
          <p className="form__label">Ending Date*</p>
          <input
            type="date"
            name="endingDate"
            value={item.endingDate}
            className="form__input"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <p className="form__label">Degree*</p>
          <input
            type="text"
            name="degree"
            value={item.degree}
            className="form__input"
          />
        </div>
        <div>
          <p className="form__label">University*</p>
          <input
            type="text"
            name="university"
            value={item.university}
            className="form__input"
          />
        </div>
      </div>  

         <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] 
       cursor-pointer">
   <AiOutlineDelete/> 
   </button>
    </div>
  </div>
))}
<button onClick={addQualificationHandler} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
  Add Qualifications
</button>
</div>

<div className="mb-5">
  <p className="form__label">Experiences*</p>
  {formData.experiences?.map((item, index) => (
  <div key={index}>
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="form__label">Starting Date*</p>
          <input
            type="date"
            name="startingDate"
            value={item.startingDate}
            className="form__input"
          />
        </div>
        <div>
          <p className="form__label">Ending Date*</p>
          <input
            type="date"
            name="endingDate"
            value={item.endingDate}
            className="form__input"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <p className="form__label">Position*</p>
          <input
            type="text"
            name="position"
            value={item.position}
            className="form__input"
          />
        </div>
        <div>
          <p className="form__label">Hospital*</p>
          <input
            type="text"
            name="hospital"
            value={item.hospital}
            className="form__input"
          />
        </div>
      </div>  

         <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] 
       cursor-pointer">
   <AiOutlineDelete/> 
   </button>
    </div>
  </div>
))}

<button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
  Add Experiences
</button>
</div>
<div className="mb-5"> 
  <p className="form__label">Time Slots*</p>
  {formData.timeSlots?.map((item, index) => (
  <div key={index}>
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px]  gap-5">
        <div>
          <p className="form__label">Day*</p>
          <select name="day" value={item.day} className="form__input py-3.5">
            <option value="">Select</option>
            <option value="saturady">Saturday</option>
            <option value="sunday">Sunady</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="Thrusday">Thrusday</option>
            <option value="Friday">Friday</option>
            </select>
        </div>
        <div>
          <p className="form__label">Starting Time*</p>
          <input
            type="time"
            name="startingTime"
            value={item.startingTime}
            className="form__input"
          />
        </div>
        <div>
          <p className="form__label">Ending Time*</p>
          <input
            type="time"
            name="endingTime"
            value={item.endingTime}
            className="form__input"
          />
        </div>
        <div className="flex items-end">
           <button className="bg-red-600 p-2 rounded-full text-white text-[18px] 
       cursor-pointer mt-6">
   <AiOutlineDelete/> 
   </button>
        </div>
      </div>
    </div>
  </div>
))}

<button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
  Add TimeSlots
</button>
</div>

<div className="mb-5">
  <p className=" ">About*</p>
  <textarea 
  name="about" 
  rows={5} 
  value={formData.about} 
  placeholder="Write about yourself"
  onChange={handleInputChange}
  className="form__input rounded-none"
  ></textarea>
</div>

<div className="mb-5 flex items-center gap-3">
{ formData.photo && (<figure className='w-[60px] h-[60px] rounded-full border-2 border-solid
               border-primaryColor flex items-center justify-center'>
                <img src={formData.photo} alt="" className='w-full rounded-full' />
              </figure>
              )}

              <div className='relative w-[130px] h-[50px]'>
                <input 
                 type="file"
                 name="photo" 
                 id="customFile"
                 onChange={handleFileInputChange}
                 accept='.jpg, .png'
                 className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                />
                <label 
                 htmlFor="customFile"
                 className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
                 text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
                >
                  Upload Photo
                </label>
              </div>
</div>

<div className="mt-7">
<button type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] leading-[30px] 
w-full py-3 px-4 rounded-lg">Update Profile</button>
</div>

      </form>
    </div>
  );
};

export default Profile;