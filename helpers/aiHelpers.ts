import React from "react";

export async function PrepareEmail(divRef:React.MutableRefObject<HTMLElement | null>){

    const subject = divRef.current?.querySelector('h1');
    const divTags = divRef.current?.querySelectorAll('div');
    if(!divTags){
        throw new Error('No div tags found');
    }
    const body = divTags[0];
    const footer = divTags[1];
    const response = {
        subject: subject?.textContent,
        body: body?.textContent,
        footer: footer?.textContent
    }
   
    return response
}