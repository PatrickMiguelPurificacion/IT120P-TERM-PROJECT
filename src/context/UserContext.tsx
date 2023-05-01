import { EmailAuthProvider, User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { FieldPath, Timestamp, arrayUnion, collection, doc, documentId, getDocs, limit, query, setDoc, updateDoc, where } from 'firebase/firestore';
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

interface ContactEmployee{
    uuid: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
}

interface LogEmployee{
    uuid: string;
    fullName: string;
    timeIn: Date;
    timeOut: Date;
}
  
export const UserContext = createContext<{
    user: User | null;
    currentEmployee: CurrentEmployee | null;
    updateEmployee: UpdateEmployee | null;
    contactEmployee: ContactEmployee | null;
    logEmployee: LogEmployee[] | null;
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
    updateUserPassword: (
        email: string,
        oldPassword: string,
        newPassword: string,
    )=> Promise<void>;
    getEmployee: (uuid: string) => Promise<void>;
    getEmployeeLog: (uuid: string) => Promise<void>;
    contactAdmin: (
        uuid: string,
        fullName: string,
        email: string,
        subject: string,
        message: string
    )=> Promise<void>;
    saveEmployeeLog:(
        uuid: string,
        fullName: string,
        timeIn: Date,
        timeOut: Date,
    )=> Promise<void>;
    logout: () => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
  }>({
    user: null,
    currentEmployee: null,
    updateEmployee: null,
    contactEmployee: null,
    logEmployee: null,
    createUser: async () => {
        throw new Error('createUser function not implemented');
    },
    updateUser: async () => {
        throw new Error('updateUser function not implemented');
    },
    updateUserPassword: async () => {
        throw new Error('updateUserPassword function not implemented');
    },
    getEmployee: async () => {
        throw new Error('getEmployee function not implemented');
    },
    getEmployeeLog: async () => {
        throw new Error('getEmployeeLog function not implemented');
    },
    contactAdmin: async () => {
        throw new Error('contactAdmin function not implemented');
    },
    saveEmployeeLog: async () => {
        throw new Error('saveEmployeeLog function not implemented');
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
    const [contactEmployee, setContactEmployee] = useState<ContactEmployee | null>(null);
    const [logEmployee, setLogEmployee] = useState<LogEmployee[] | null>([])
    const {getDefaultProfilePictureURL, updateProfilePicture} = StorageAuth();

    const createUser = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        gender: string,
        contact: string,
        address: string
    ) => {
        try {
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
    
            const UserCredentials = await createUserWithEmailAndPassword(auth, email, password);
    
            const employeesCollection = collection(db, 'Employees');
            const employeeDocRef = doc(employeesCollection, UserCredentials.user.uid);
    
            await setDoc(employeeDocRef, employee);
            await getEmployee(UserCredentials.user.uid);
    
        } catch (error) {
            console.error(error);
            throw error;
        }
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
        
        try {
            const employee = {
                First_Name: firstName,
                Last_Name: lastName,
                Email: email,
                Gender: gender,
                Contact: contact,
                Address: address,
                Role: role,
                Manager_ID: managerID
            }
    
            const auth = getAuth();
            const credential = EmailAuthProvider.credential(email, password);
    
            await reauthenticateWithCredential(auth.currentUser!, credential);

            if(email !== auth.currentUser!.email){

                await updateEmail(auth.currentUser!, email);

            }

            const employeesCollection = collection(db, 'Employees');
            const employeeDocRef = doc(employeesCollection, uuid);
    
            if(profilePicture?.size !== 0){
                await updateProfilePicture(uuid, profilePicture!);
            }
    
            await updateDoc(employeeDocRef, employee);
            await getEmployee(uuid);
            setUpdateEmployee({
                uuid: uuid,
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
                password: "",
                contact: contact,
                address: address,
                role: role,
                managerID: managerID,
                profilePicture: null
            })
    
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    const updateUserPassword = async (email: string, oldPassword: string, newPassword: string) => {
        try {
            const auth = getAuth();
            const credential = EmailAuthProvider.credential(email, oldPassword);
            await reauthenticateWithCredential(auth.currentUser!, credential);
            await updatePassword(auth.currentUser!, newPassword);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getEmployee = async (uuid: string) => {
        try {
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
                    };
                });
    
                if (employee) {
                    return setCurrentEmployee(employee);
                }
            }
    
            return setCurrentEmployee(null);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const contactAdmin = async (
        uuid: string,
        fullName: string,
        email: string,
        subject: string,
        message: string
    ) => {
        try {
            const ticketRequest = {
                [subject]: arrayUnion({
                    Employee_ID: uuid,
                    Full_Name: fullName,
                    Email: email,
                    Message: message
                })   
            }
    
            const ticketsCollection = collection(db, 'Tickets');
            const ticketsDocRef = doc(ticketsCollection, new Date().toLocaleDateString().replaceAll('/','-'));
    
            await setDoc(ticketsDocRef, ticketRequest, {merge: true});
            setContactEmployee({
                uuid: uuid,
                fullName: fullName,
                email: email,
                subject: subject,
                message: message
            })
    
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const saveEmployeeLog = async (
        uuid: string,
        fullName: string,
        timeIn: Date,
        timeOut?: Date | null
    ) => {
        try {
            const logTimeIn = {
                [uuid]: {
                    Employee_Name: fullName,
                    Time_In: timeIn
                }
            }
    
            const logTimeOut = {
                [uuid]: {
                    Employee_Name: fullName,
                    Time_Out: timeOut
                }
            }

            const existingLogsRef = collection(db, "Logs");
            const existingLogsQuery = query(existingLogsRef, where(documentId(), "==", timeIn!.toLocaleDateString().replaceAll('/', '-')));
            const existingLogsSnap = await getDocs(existingLogsQuery);
    
            let isTimedIn = false;
            let isTimedOut = false;

            existingLogsSnap.forEach((doc) => {
                
                if(doc.data()[uuid]){
                    if (doc.data()[uuid].Time_In) {
                        isTimedIn = true;
                    }
        
                    if (doc.data()[uuid].Time_Out) {
                        isTimedOut = true;
                    }
                }
                
            });
    
            if (isTimedIn && isTimedOut) {
                throw new Error('You have already submitted your log for today.');
            }

            const logsCollection = collection(db, 'Logs');
            let logDocRef = doc(logsCollection, timeIn!.toLocaleDateString().replaceAll('/', '-'));
    
            if (!isTimedIn) {
                await setDoc(logDocRef, logTimeIn, { merge: true });
            } else {
                logDocRef = doc(logsCollection, timeOut!.toLocaleDateString().replaceAll('/', '-'));
                await setDoc(logDocRef, logTimeOut, { merge: true });
            }
    
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getEmployeeLog = async (uuid: string) => {
        try {
            setLogEmployee([]);
            const existingLogsRef = collection(db, "Logs");
            const existingLogsQuery = query(existingLogsRef, limit(25));
            const existingLogsSnap = await getDocs(existingLogsQuery);
    
            if (!existingLogsSnap.empty) {

                existingLogsSnap.forEach((doc) => {
                    if (doc.data()[uuid]) {
                        if (doc.data()[uuid].Time_Out) {
                            setLogEmployee((prevLogEmployee) => [
                                ...prevLogEmployee as LogEmployee[],
                                {
                                    uuid: uuid,
                                    fullName: doc.data()[uuid].Employee_Name,
                                    timeIn: doc.data()[uuid].Time_In.toDate(),
                                    timeOut: doc.data()[uuid].Time_Out.toDate()
                                },
                            ]);
                        } else {
                            setLogEmployee((prevLogEmployee) => [
                                ...prevLogEmployee as LogEmployee[],
                                {
                                    uuid: uuid,
                                    fullName: doc.data()[uuid].Employee_Name,
                                    timeIn: doc.data()[uuid].Time_In.toDate(),
                                    timeOut: new Date(0)
                                },
                            ]);
                        }
                    }
                });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const signIn = async (email: string, password: string) =>{

        try{
            
            return signInWithEmailAndPassword(auth, email, password).then(async (UserCredentials) =>{

                await getEmployee(UserCredentials.user.uid);

            });

        } catch (error) {
            console.error(error);
            throw error;
        }

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
      <UserContext.Provider  value={{ 
            user, 
            currentEmployee, 
            updateEmployee, 
            contactEmployee,
            logEmployee, 
            createUser, 
            updateUser,
            updateUserPassword,
            getEmployee,
            getEmployeeLog,
            contactAdmin,
            saveEmployeeLog,
            signIn, 
            logout 
        }}>
        {children}
      </UserContext.Provider>
    )
}
  
export const UserAuth = () =>{
    return useContext(UserContext);
}