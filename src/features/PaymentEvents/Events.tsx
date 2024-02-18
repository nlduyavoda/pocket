import { getCollection } from "@services/FireBaseMethods";
import { EVENTS } from "@services/utils";
import { useEffect, useState } from "react";
import { FormAddEvent } from "./Form/FormAddEvents";
import { ColumnType } from "antd/es/table";
import { Table } from "antd";
import { EventColumn, EventType } from "./EventTypes";
import { useNavigate } from "react-router-dom";

export const Events = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  useEffect(() => {
    const getEventsFromFireBase = async () => {
      const { status, data } = (await getCollection({
        collectionName: EVENTS,
        documentName: EVENTS,
      })) as { status: string; data: EventType[]; message: string };
      if (status === "ok") {
        setEvents(data);
      }
    };
    getEventsFromFireBase();
  }, []);
  return (
    <>
      {events?.length ? <TableEvents events={events} /> : "loading"}
      <FormAddEvent />
    </>
  );
};

const TableEvents = ({ events }: { events: EventType[] }) => {
  const navigate = useNavigate();
  const tableData = events;

  const columns: ColumnType<EventColumn>[] = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "startDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "endDate",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];
  const handleSelect = (eventId: string) => {
    const path = `/${EVENTS}/${eventId}`;
    return navigate(path);
  };

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      bordered
      scroll={{ x: 600, y: 300 }}
      onRow={(record: any, _: unknown) => {
        return {
          onClick: (event: unknown) => {
            handleSelect(record?.id);
          },
        };
      }}
    />
  );
};
