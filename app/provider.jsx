import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'

const Provider = ({children}) => {

    const user = useUser();
    const [userDetail,setUserDetail] = useState(null);
    const CreateNewUserMutation = useMutation(api.users.CreateNewUser)

    useEffect(()=>{
        user && CreateUser();
    },[user])

    const CreateUser = async ()=>{
        const data = {
            name : user?.displayName,
            email: user?.primaryEmail,
            picture : user?.profileImageUrl
        }

        const result = await CreateNewUserMutation({
            ...data
        });

        console.log(result);
        setUserDetail(result);
    }

  return (
    <UserDetailContext value={{userDetail,setUserDetail}}>

    <div>{children}</div>
    </UserDetailContext>
  )
}

export default Provider