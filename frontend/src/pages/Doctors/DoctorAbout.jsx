import React from 'react' ;
import { formatDate } from '../../utils/formatDate'

const DoctorAbout = ({name, about, qualifications, experiences}) => {
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                About of
                <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                    Dipesh Shah
                </span>
            </h3>
            <p className="text__para">
                With over 20 years of surgical excellence, Dr. Dipesh Shah is renowned for his 
                precision, compassion, and dedication to patient care. Specializing in minimally 
                invasive procedures, he has successfully performed thousands of surgeries, combining 
                advanced medical technology with a personalized approach. His commitment to safety, 
                clear communication, and patient well-being has earned him the trust of individuals and 
                families across the region. Whether it’s a complex operation or routine procedure, Dr. Shah 
                ensures every patient receives the highest standard of care from consultation to recovery.
            </p>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Education
            </h3>
            <ul className='pt-4 md:p-5'>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                        {formatDate('06-04-2010')} - {formatDate('12-04-2017')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            PhD in Surgeon
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                            Guru Gobind Singh Indraprastha University, New Delhi.
                    </p>
                </li>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formatDate('12-04-2017')} - {formatDate('12-04-2028')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Internships
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                            All India Institute of Medical Sciences, New Delhi.
                    </p>
                </li>
            </ul>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Experience
            </h3>
            <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                    {formatDate('12-04-2018')} - {formatDate('12-04-2020')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Surgeon Doctor
                    </p>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Indra Gandhi Institute of Medical Sciences, Patna,
                    </p>
                </li>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                    {formatDate('12-04-2020')} - {formatDate('12-04-2022')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Surgeon Doctor
                    </p>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Appolo Hospital, New Delhi,
                    </p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default DoctorAbout