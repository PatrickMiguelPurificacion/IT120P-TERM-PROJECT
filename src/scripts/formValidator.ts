class FormValidator{

    static isValidFirstName: any;
    static isValidLastName: any;
    static isValidEmail: any;
    static isValidGender: any;
    static isValidPassword: any;
    static isValidContact: any;
    static isValidAddress: any;
    static isValidManagerID: any;
    static isValidEmployeeID: any;
    static isValidFullName: any;


    isValidEmployeeID (id: string) {

        const idPattern = /^[a-zA-Z0-9]{28}$/;

        return idPattern.test(id);

    }

    isValidFullName = (fullName: string) =>{
    
        const lastNamePattern = /^[a-zA-Z ]+$/;
  
        if(fullName.length < 4){
  
            return true;
  
        }
  
        return lastNamePattern.test(fullName);
        
    }

    isValidFirstName(firstName: string){
   
        const firstNamePattern = /^[a-zA-Z ]+$/;
    
        if(firstName.length < 4){
    
            return true;
    
        }
    
        return firstNamePattern.test(firstName);
        
    }
    
    isValidLastName = (lastName: string) =>{
        
        const lastNamePattern = /^[a-zA-Z ]+$/;

        if(lastName.length < 4){

            return true;

        }

        return lastNamePattern.test(lastName);
          
    }
    
    isValidEmail = (email: string) =>{
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
          
    }
    
    isValidGender = (gender: string) =>{
        
        const validGenders = ["male", "female", "other"];
        return validGenders.includes(gender.toLowerCase());
          
    }
    
    isValidPassword = (password: string) =>{
        
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
        return passwordPattern.test(password);
          
    }
    
    isValidContact = (contact: string) =>{
    
        const contactPattern = /^\+?[0-9]\d{1,20}$/;
        return contactPattern.test(contact);
        
    }
    
    isValidAddress = (address: string) =>{
    
        const addressPattern = /^[a-zA-Z0-9\s,-]+$/;
        return addressPattern.test(address);
        
    }

    isValidManagerID = (managerID: number) =>{
    
        const managerIDPattern = /^[0-9]+$/;
        return managerIDPattern.test(managerID.toString());
    
    }

}

export default FormValidator;