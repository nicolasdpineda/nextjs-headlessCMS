import Layout from '../../components/Layout';
import Link from 'next/link';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
// const apiUrl = 'http://localhost:1337';

const Subjects = ({ subject, essays }) => {
  return (
    <>
      <Layout>
        <div className='flex font-bold justify-center bg-red-700 text-white rounded text-3xl'>
          ⏲ The Timer Will Start When You Click on the Exam!
        </div>
        <div className='font-bold text-4xl'>{subject.title}</div>
        <div className='flex flex-wrap mb-4 rounded justify-center'>
          {essays.map((essay, index) => (
            <div className='max-w-sm  shadow-md w-1/2' key={index}>
              <Link href='/essays/[id]' as={`/essays/${essay.id}`}>
                <div className='p-4 text-2xl hover:bg-red-700 hover:text-white rounded-md'>
                  <div className='font-regular'>
                    {essay.month}
                    {','} {essay.year}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`${apiUrl}/subjects/${id}`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      subject: data,
      essays: data.essays,
    },
  };
}

export default Subjects;