import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthInfo } from '../features/auth/authSlice'

export const useAuth = () => {
  const authInfo = useSelector(selectAuthInfo)

  return useMemo(() => ({ authInfo }), [authInfo])
}
