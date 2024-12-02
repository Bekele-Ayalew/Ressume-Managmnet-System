export interface ICompany{

    id:string;
    name:string;
    size:string;
    createdAt:string;
    isActive:string;
    modifiedAt:string;
}
export interface ICreateCompanyDto{

    name:string;
    size:string;
   
}

export interface IJob {
    id:string;
    title:string;
    level:string;
    isActive:string;
    companyName:string;
    createdAt:string;
    modifiedAt:string;

}
export interface ICreateJobDto{

    title:string;
    level:string;
    companyId:string;
   
}
export interface ICandidate{

   
    name:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    coverLetter:string;
    resumeUrl:string;
    jobTitle:string;
}
export interface ICreateCandidateDto{

   
    name:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    coverLetter:string;
    JobId:string;
}





