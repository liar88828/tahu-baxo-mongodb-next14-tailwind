import { IconSearch } from "@/components/icon/IconMore";

export function SearchInput() {
  return (
    <div className='join w-full'>
      <input
        className='input input-bordered join-item w-full  rounded-l-full '
        placeholder='Search ....'
      />
      <button className='btn join-item rounded-r-full '>
        <IconSearch />
      </button>
    </div>
  )
}
