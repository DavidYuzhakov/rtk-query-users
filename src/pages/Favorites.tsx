import { FavoriteCard } from "../components/FavoriteCard"
import { useAppSelector } from "../hooks/redux"

export default function Favorites () {
  const favs = useAppSelector(state => state.favorite.favorites)

  return (
    <div className="container mx-auto py-5">
      <h1 className="font-semibold text-3xl mb-5">Favorites</h1>
      {favs.map(fav => <FavoriteCard key={fav.id} {...fav} />)}
      {favs.length === 0 && <p>Add at least 1 user</p>}
    </div>
  )
}