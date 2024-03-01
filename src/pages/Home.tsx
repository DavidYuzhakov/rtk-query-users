import UserCard from "../components/UserCard"
import useDebounce from "../hooks/debounce"
import { useAppSelector } from "../hooks/redux"
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../store/services/users.api"

export default function Home () {
  const limit = useAppSelector(state => state.users.limit)
  const debounced = useDebounce(limit)

  const {data: users, isLoading} = useGetUsersQuery(debounced)
  const [deleteUser, {}] = useDeleteUserMutation()
  const [updateUser, {}] = useUpdateUserMutation()

  return (
    <div className="container mx-auto py-5">
        <div className="flex items-center flex-wrap gap-4">
          {isLoading && <p className="text-center">Loading...</p>}
          {users?.map(user => <UserCard remove={deleteUser} update={updateUser} key={user.id} user={user} />)}
          {users?.length === 0 && <p className="text-center">Users is not exist</p>}
        </div>
      </div>
  )
}