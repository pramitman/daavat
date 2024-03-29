
export class apiResponse {
    private status: number | null
    private message: string | null
    private data: any | null
    private error: any | null
    constructor(status: number, message: string, data: any, error: any) {
        this.status = status
        this.message = message
        this.data = data
        this.error = error
    }
}

export const file_path = ['profile', 'document']

export const userStatus = {
    user: "user",
    admin: "admin",
    upload: "upload"
}

export const unit = [
    "kg"
]

export const unitType = [
    "pcs",
    "cartoon"
]

export const status = [
    "pending",
    "approve",
    "delivery",
    "canceled",
    "delivered",
]

export const roleTypes = [
    "superAdmin",
    "admin",
    "agency",
    "salesman",
    "deliveryman",
    "shop",
]

export const ADMIN_ROLES = 
{
    SUPERADMIN : "superAdmin",
    ADMIN : "admin",
    AGENCY : "agency" ,
    SALESMAN : "salesman",
    DELIVERYMAN : "deliveryman",
    SHOP : "shop",
}

// export const agencyRole = [
//     "agency"
// ]

// export const userRole = [
//     "salesman",
//     "deliveryman"
// ]

export const generate_otp = async () => {
    try {
        //   let options = {
        //         length : 6,
        //         charset : '123456789'
        //   }
        //   let otp = random_string.generate(options);
        const otp = Math.floor(1000 + Math.random() * 9000);
        //let otp = 123456;
        return otp;
    } catch (err) {
        throw err;
    }
};

export const generateUserId = (prefix)=> {
    const randomInt = Math.floor(Math.random() * 100000); // Generate a random integer between 0 and 99999
    const userId = `${prefix}${randomInt.toString().padStart(5, '0')}`; // Combine the random integer with the prefix ex."u-" and pad with leading zeros
    return userId;
}

export const  generatePassword =() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Define the possible characters for the password
    let password = '';
    for (let i = 0; i < 5; i++) { // Generate a random password of length 5
      const randomIndex = Math.floor(Math.random() * characters.length); // Generate a random index within the range of the characters array
      password += characters[randomIndex]; // Add a random character from the characters array to the password
    }
    return password;
}