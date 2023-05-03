"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./headerLogo.css"


export const HeaderLogo = () => {

    const [newLogo, setLogo] = useState();

    // if (typeof window !== "undefined") {
    //     var logo = localStorage.getItem('color-theme') === 'dark' ? "/apexit-white.png" : "/apexLogo.png";
    //     setLogo(logo);
    //     return <Image src={`${logo}`} className="mr-3 h-20 sm:h-10 md:h-20 CAU__HeaderLogo" width={100} height={100} alt="ApexIT" />
    // }
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            var logo = localStorage.getItem('color-theme') === 'dark' ? "/apexit-white.png" : "/apexLogo.png";
            setLogo(logo);
            console.log("Theme--->", newLogo)
        }
    }, [newLogo])
    
    return <Image src="/apexLogo.png" className="mr-3 h-20 sm:h-10 md:h-20 CAU__HeaderLogo" width={100} height={100} alt="ApexIT" />


}




export default HeaderLogo;