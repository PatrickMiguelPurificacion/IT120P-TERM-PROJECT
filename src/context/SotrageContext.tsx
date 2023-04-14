import { collection, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { db } from '../scripts/firebase-init';

export const StorageContext = createContext<{
    getDefaultProfilePictureURL: () => Promise<string>;
    getProfilePictureURL: (uuid: string) => Promise<string>;
    updateProfilePicture: (uuid: string, file: File) => Promise<void>;
    deleteProfilePicture: (uuid: string) => Promise<void>;
  }>({
    getDefaultProfilePictureURL: async () => {
        throw new Error('getDefaultProfilePictureURL function not implemented');
    },
    getProfilePictureURL: async () => {
        throw new Error('getProfilePictureURL function not implemented');
    },
    updateProfilePicture: async () => {
        throw new Error('updateProfilePicture function not implemented');
      },
    deleteProfilePicture: async () => {
        throw new Error('deleteProfilePicture function not implemented');
    }
});

export const StorageContextProvider = ({children}: {children: ReactNode}) =>{

    const storage = getStorage();
    let profilePictureRef = ref(storage, `Employees/Profile_Pictures/_Default.webp`);

    const getDefaultProfilePictureURL = async () =>{
        
        try {

            const url = await getDownloadURL(profilePictureRef);
            return url;

        } catch (error) {
            console.error(error);
            throw error;
        }

    }
  
    const getProfilePictureURL = async (uuid: string) =>{

        try {

            profilePictureRef = ref(storage, `Employees/Profile_Pictures/${uuid}`);
            const url = await getDownloadURL(profilePictureRef);
            return url;

        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    const updateProfilePicture = async (uuid: string, file: File) =>{

        try {

            profilePictureRef = ref(storage, `Employees/Profile_Pictures/${uuid}`);
            await deleteProfilePicture(uuid);
            await uploadBytes(profilePictureRef, file).then(async (snapshot) => {

                getDownloadURL(profilePictureRef).then(async (url)=>{

                    const employeesCollection = collection(db, 'Employees');
                    const employeeDocRef = doc(employeesCollection, uuid);
                    await updateDoc(employeeDocRef, {
                        Profile_Picture: url
                    });

                }).catch((error)=>{

                    console.error(error);
    
                });

            }).catch((error)=>{

                console.error(error);

            });
              

        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    const deleteProfilePicture = async (uuid: string) =>{

        try {

            profilePictureRef = ref(storage, `Employees/Profile_Pictures/${uuid}`);

            if(profilePictureRef.root.parent !== null){
                await deleteObject(profilePictureRef).catch((error)=>{
                    console.error(error)
                });
            }

        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    useEffect(() =>{
  
    }, [])

    return(
      <StorageContext.Provider  value={{ getDefaultProfilePictureURL, getProfilePictureURL, updateProfilePicture, deleteProfilePicture }}>
        {children}
      </StorageContext.Provider>
    )
}
  
export const StorageAuth = () =>{
    return useContext(StorageContext);
}