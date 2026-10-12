import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

export default function MeetupDetails({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content="Own meetup item details!" />
      </Head>
      <MeetupDetail {...meetupData} />
    </>
  );
}

export async function getStaticPaths(params) {
  console.log(params, "params_2");

  const client = await MongoClient.connect(
    "mongodb+srv://tigrangrigoryan2021_db_user:BYbPhHQ495psrxMk@cluster0.birkyih.mongodb.net/meetups",
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection
    .find(
      {},
      {
        _id: 1,
      },
    )
    .toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a singl meetup

  console.log(context, "getStaticProps___details");

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://tigrangrigoryan2021_db_user:BYbPhHQ495psrxMk@cluster0.birkyih.mongodb.net/meetups",
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  console.log(selectedMeetup, "TEST__");

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
