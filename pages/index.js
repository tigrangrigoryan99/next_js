import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

export default function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>Rect Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   console.log(context, "context___");

//   // fetch data
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data
  const client = await MongoClient.connect(
    "mongodb+srv://tigrangrigoryan2021_db_user:BYbPhHQ495psrxMk@cluster0.birkyih.mongodb.net/meetups",
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
