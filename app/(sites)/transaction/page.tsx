import React from 'react';
import Link from "next/link";

function Page() {
  return (
    <>
      <div className="flex justify-center ">
        <iframe
          src="https://lottie.host/embed/c6027413-44af-4784-9120-84d50a3c7100/8RrEvNNS5h.json"
          className={'size-44'}
        ></iframe>
      </div>
      <div className="p-4 space-y-8">
        <div className="text-center space-y-2">
          <h1 className={'font-bold text-2xl'}>Ovo Top up Success </h1>
          <h2 className={' text-xl'}>Success topped up $123 to @user1</h2>
        </div>
        <div className="rounded-3xl p-5 border shadow-md space-y-3">
          <h1 className='font-bold text-xl'>Detail Transaction</h1>
          <div className="space-y-5 s mt-2">
            <TextTransaction title={"Transaction ID"} text={'123 123 123'} />
            <TextTransaction title={'Date'} text={'02:12 16 May 2023'} />
            <TextTransaction title={"Type Transaction"} text={'Mandiri'} />
            <TextTransaction title={"Nominal"} text={'Rp123.12'} />
            <TextTransaction title={"Number Phone"} text={'123-123123'} />
            <div className="flex justify-between w-full">
              <h1 className={'text font-medium text-neutral/50'}>Status</h1>
              <div className="badge badge-success badge-outline ">
                <h2 className={'text font-semibold '}>Success</h2>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between w-full mt-2">

              <h1 className={'text font-medium '}>Total</h1>
              <h2 className={'text font-semibold'}>$1432</h2>
            </div>
          </div>
        </div>
        <Link
          href={'/home'}
          className={'btn btn-block btn-success font-bold shadow-md text-base-200 text-lg'}
        >
          Back Home
        </Link>
      </div>
    </>

  );
}

export default Page;

const TextTransaction = (
  {title, text} :
    {
      title : string, text : string,
    }
) => {
  return (
    <div className="flex justify-between w-full">
      <h1 className={'text font-medium text-neutral/50'}>{title}</h1>
      <h2 className={'text font-semibold text-neutral/80'}>{text}</h2>
    </div>
  );
};
