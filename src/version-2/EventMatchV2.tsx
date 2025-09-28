import React from "react";
import PageLayout from "./PageLayout";
import { useAppQueryParams } from "../utils";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import EventNotFound from "./EventNotFound";
import { Swords } from "lucide-react";
import Button from "./Button";
import NewMatchV2 from "./NewMatchV2";

const EventMatchV2: React.FC = () => {
  const [queryParams] = useAppQueryParams();
  const event = useSelector(
    (state: RootState) => state.events_v2?.[queryParams.event_slug]
  );
  if (!event) {
    return (
      <PageLayout title="Event Match" titleIcon={<Swords />}>
        <EventNotFound />
      </PageLayout>
    );
  }

  const matchIndex = Number(queryParams.match);
  const match = event.matches[matchIndex];
  const isNewMatch = matchIndex === event.matches.length;
  if (!match && !isNewMatch) {
    return (
      <PageLayout title="Event Match" titleIcon={<Swords />}>
        <div className="text-red-500">Match not found.</div>
      </PageLayout>
    );
  }

  if (isNewMatch) {
    return <NewMatchV2 />;
  }

  return (
    <PageLayout title="Event Match" titleIcon={<Swords />}>
      <p>Event Match V2 works!</p>
      <Button>Anjay</Button>
    </PageLayout>
  );
};

export default EventMatchV2;
