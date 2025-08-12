export interface User {
    emailId: string,
    password: string
}



export interface IUserModel {
    userId: number,
    emailId: string,
    password: string,
    createdDate: string,
    projectName: string,
    fullName: string,
    mobileNo: string,
    extraId: number
}

export interface ResponseModel {
    message: string,
    result: boolean,
    data: any
}


export interface ISite {
   
        siteId: number
        clientId: number
        siteName: string
        siteCity: string
        siteAddress: string
        sitePinCode: string
        totalBuildings: number
        createdDate: string
  
      
}

export interface IBuilding {
    buildingId: number
    siteId: number
    buildingName: string
    buildingManagerName: string
    contactNo: string
    siteName: string
}

export interface IFloor {
    floorId: number
    buildingId: number
    floorNo: string
    isOperational: boolean
    totalParkingSpots: number
}