import Link from 'next/link'
import { Modal } from '../core/Modal'
import Image from 'next/image'
import { FiCoffee } from '@react-icons/all-files/fi/FiCoffee'

export const BuyMeACoffee = () => (
  <Modal
    modalOpener={({ open }) => (
      <button
        className='flex text-amber-950 justify-center items-center gap-2 font-bold bg-notion-yellow rounded-md px-3 py-1'
        onClick={open}
      >
        <FiCoffee />
        Buy Me A Coffee
      </button>
    )}
  >
    <div className='flex flex-col gap-3 mx-auto w-52'>
      <span className='mx-auto font-extrabold text-lg'>Buy Me A Coffee</span>
      <div>
        <span className='text-md font-bold'>Toss 익명 송금</span>
        <div>
          <Link
            href='https://toss.me/mobie'
            className='notion-link text-sm mt-2'
            target='_blank'
            rel='noreferrer'
          >
            toss.me/mobie
          </Link>
        </div>
      </div>
      <div>
        <span className='text-md font-bold'>QR Code</span>
        <div className='flex text-sm gap-3 mt-2 justify-between'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image
              width={30}
              height={30}
              className='rounded-full'
              src='/kakao-pay-logo.png'
              alt='kakao-pay-logo'
            />
            <Image
              width={100}
              height={100}
              src='/kakao-pay-qr.png'
              alt='kakao-pay-qr'
            />
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image
              width={30}
              height={30}
              className='rounded-full'
              src='/toss-logo.png'
              alt='toss-logo'
            />
            <Image width={100} height={100} src='/toss-qr.png' alt='toss-qr' />
          </div>
        </div>
      </div>
    </div>
  </Modal>
)
