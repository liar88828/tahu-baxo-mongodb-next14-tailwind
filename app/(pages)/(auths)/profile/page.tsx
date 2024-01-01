import Profile from '@/app/(pages)/(auths)/profile/Profile';

export default async function Page() {

  return (
    <main className={'mt-4'}>
      <section>
        <Profile/>
        <div className=" mt-4">
          <div className='static card bg-base-200/70 card-body shadows'>
            <h1 className='card-title'>History</h1>
            <div className="">
            </div>
          </div>
        </div>

        {/*<PopUp title={ 'Edit' } name={ 'profile' } color>*/ }
        {/*</PopUp>*/ }

      </section>
    </main>
  )
}
