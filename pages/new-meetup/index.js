import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

export default function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(meetupData) {
    const respons = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respons.json();

    router.push("/");

    console.log({ meetupData, data }, "FORM__DATA");
  }

  return (
    <>
      <Head>
        <title>New meetyp</title>
        <meta name="description" content="Add your own new meetup!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
}
