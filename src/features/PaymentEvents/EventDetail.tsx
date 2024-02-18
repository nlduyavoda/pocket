import { findDocumentById } from "@services/FireBaseMethods";
import { FetchResType } from "@services/Types";
import { EVENTS } from "@services/utils";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EventType } from "./EventTypes";
import { DateField } from "@components/Date";

export const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventType | null>();
  // query detail event
  // query transaction
  useEffect(() => {
    async function getEventDetail() {
      const result: FetchResType = await findDocumentById({
        documentName: EVENTS,
        eventId: eventId || "",
      });
      const { data } = result as unknown & { data: EventType | null };
      setEvent(data);
      return result;
    }
    getEventDetail();
  }, []);

  return (
    <div>
      <Typography.Title>{event?.title}</Typography.Title>
      <div className="inline-flex justify-between w-full">
        <Typography.Text className="text-xl">
          start date:{" "}
          {typeof event?.startDate === "string" && (
            <DateField date={event?.startDate} />
          )}
        </Typography.Text>
        <Typography.Text className="text-xl">
          end date:{" "}
          {typeof event?.endDate === "string" && (
            <DateField date={event?.endDate} />
          )}
        </Typography.Text>
      </div>
    </div>
  );
};
