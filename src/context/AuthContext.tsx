import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, documentId, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../scripts/firebase-init';
import { StorageAuth } from './StorageContext';

interface User extends FirebaseUser{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    contact: string;
    address: string;
}

interface CurrentEmployee{
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    contact: string;
    address: string;
    role: string;
    managerID: number;
    profilePicture: string;
}

interface UpdateEmployee{
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
    contact: string;
    address: string;
    role: string;
    managerID: number;
    profilePicture: File | null;
}
  
export const UserContext = createContext<{
    user: User | null;
    currentEmployee: CurrentEmployee | null;
    updateEmployee: UpdateEmployee | null;
    createUser: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        gender: string,
        contact: string,
        address: string,
    ) => Promise<void>;
    updateUser: (
        uuid: string,
        firstName: string,
        lastName: string,
        email: string,
        gender: string,
        password: string,
        contact: string,
        address: string,
        role: string,
        managerID: number,
        profilePicture: File
    )=> Promise<void>;
    getEmployee: (uuid: string) => Promise<void>;
    logout: () => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
  }>({
    user: null,
    currentEmployee: null,
    updateEmployee: null,
    createUser: async () => {
        throw new Error('createUser function not implemented');
    },
    updateUser: async () => {
        throw new Error('updateUser function not implemented');
    },
    getEmployee: async () => {
        throw new Error('getEmployee function not implemented');
    },
    logout: async () => {
        throw new Error('logout function not implemented');
      },
    signIn: async () => {
        throw new Error('signIn function not implemented');
    }
});

export const AuthContextProvider = ({children}: {children: ReactNode}) =>{
  
    const [user, setUser] = useState<User | null>(null);
    const [currentEmployee, setCurrentEmployee] = useState<CurrentEmployee | null>(null);
    const [updateEmployee, setUpdateEmployee] = useState<UpdateEmployee | null>(null);
    const {getDefaultProfilePictureURL, updateProfilePicture} = StorageAuth();

    const createUser = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        gender: string,
        contact: string,
        address: string
        ) =>{

        const employee = {
            First_Name: firstName,
            Last_Name: lastName,
            Email: email,
            Gender: gender,
            Contact: contact,
            Address: address,
            Role: "Employee",
            Manager_ID: -1,
            Profile_Picture: await getDefaultProfilePictureURL()
        }

        return createUserWithEmailAndPassword(auth, email, password).then(async (UserCredentials) =>{

            const employeesCollection = collection(db, 'Employees');
            const employeeDocRef = doc(employeesCollection, UserCredentials.user.uid);

            await setDoc(employeeDocRef, employee).then(async () =>{

                await getEmployee(UserCredentials.user.uid);
                
            }).catch((error)=>{

                console.error(error)

            });

        });
        
    };

    const updateUser = async (
        uuid: string,
        firstName: string,
        lastName: string,
        email: string,
        gender: string,
        password: string,
        contact: string,
        address: string,
        role: string,
        managerID: number,
        profilePicture?: File | null | undefined
        ) =>{
        
        const auth = getAuth();
        const credential = EmailAuthProvider.credential(auth.currentUser?.email!, password);

        reauthenticateWithCredential(auth.currentUser!, credential).then(async () => {

            const employeesCollection = collection(db, 'Employees');
            const employeeDocRef = doc(employeesCollection, uuid);

            if(profilePicture?.size !== 0){
                await updateProfilePicture(uuid, profilePicture!);
            }

            await updateDoc(employeeDocRef, {
                First_Name: firstName,
                Last_Name: lastName,
                Email: email,
                Gender: gender,
                Contact: contact,
                Address: address,
                Role: role,
                Manager_ID: managerID
            });

          }).catch((error) => {
            
            console.error(error);

          });

    }

    const getEmployee = async (uuid: string) => {
        
        const employeeDocRef = query(collection(db, 'Employees'), where(documentId(), "==", uuid));
        const employeeQuery = await getDocs(employeeDocRef);
    
        if (!employeeQuery.empty) {
            
            let employee: CurrentEmployee | null = null;
            
            employeeQuery.forEach((employeeData) => {
                employee = {
                    uuid: uuid,
                    firstName: employeeData.data().First_Name,
                    lastName: employeeData.data().Last_Name,
                    email: employeeData.data().Email,
                    gender: employeeData.data().Gender,
                    contact: employeeData.data().Contact,
                    address: employeeData.data().Address,
                    role: employeeData.data().Role,
                    managerID: employeeData.data().Manager_ID,
                    profilePicture: employeeData.data().Profile_Picture
                }
            });
    
            if (employee) {

                return setCurrentEmployee(employee);

            }
        }
    
        return setCurrentEmployee(null);
    }

    const signIn = async (email: string, password: string) =>{

        return signInWithEmailAndPassword(auth, email, password).then(async (UserCredentials) =>{

            await getEmployee(UserCredentials.user.uid);

        });

    };

    const logout = async () => {
        
        return signOut(auth)
        .then(() => {
            setUser(null);
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });

    };
  
    useEffect(() =>{
  
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser as User | null);
            if(currentUser){
                getEmployee(currentUser.uid);
            }
          });
  
      return () => {
        unsubscribe();
      }
  
    }, [])

    return(
      <UserContext.Provider  value={{ user, currentEmployee, updateEmployee, createUser, updateUser, getEmployee, signIn, logout }}>
        {children}
      </UserContext.Provider>
    )
}
  
export const UserAuth = () =>{
    return useContext(UserContext);
}