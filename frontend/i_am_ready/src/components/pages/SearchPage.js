import React from 'react';
// import JobSeekerCard from '../JobSeekerCard';
import SearchResults from '../JobSeekerCard';
import { IoSearchSharp } from "react-icons/io5";
// import Image from 'react-image';

const SearchPage = () => {
    return (
    <>
        <div className='search_page'>
            <div className='search'>
                <IoSearchSharp size="3em"/>
                <input type="text" placeholder="Search by skills, job titles, locations, etc" />
            </div>
        </div>
        {/* <JobSeekerCard name={"Salau Isiaka"} title={"Software Developer"} location={"Ogun, Nigeria"} skills={["python", "javascript"]}/> */}
        <div className='job-cards'>
            <SearchResults />
        </div>
        
    </>
    );
};

export default SearchPage;
