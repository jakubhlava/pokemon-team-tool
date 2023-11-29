import Image from 'next/image'

export default function Home() {
    const pokemonType = "bug"
  return (
      <div className="flex flex-col gap-4">
          <button className={`btn bg-${pokemonType} hover:bg-${pokemonType}-dark`}>
              BUG
          </button>
      </div>
  )
}
