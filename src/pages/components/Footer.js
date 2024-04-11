import masters from '../../../public/masters.png';
import boys from '../../../public/boys.jpeg';
import Image from 'next/image';

export default function Footer() {
  return (
    <section className="footer p-10 bg-neutral text-neutral-content">
      <aside>
        <Image src={masters} width={100} height={100} className="mb-8" />
        <p>
          Not affiliated with the Masters or Augusta National Golf Club. <br />
          Literally just making this for me and 4 other people, Augusta please don't send me a cease and desist.
        </p>
      </aside>

      <div>
        <Image src={boys} width={200} height={200} className="mb-8" />
      </div>
      
    </section>
  );
}
