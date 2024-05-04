import { Category, CustomType, EventPayment } from "@types/FirebaseSource";
import { DatePicker, Form, Input, Select } from "antd";
import { ColumnType } from "antd/es/table";

export const paymentColumns = ({ bills, categories, events }) => {
  return bills[0]
    ? Object.entries(bills[0])
        .filter(([key, value]) => !["id", "eventId", 'createAt'].includes(key))
        .map(([key, value]) => {
          const column: ColumnType<CustomType> = {
            dataIndex: key,
            key,
            title: key,
            width: 100,
            render: (
              value: { seconds: number },
              record: unknown,
              dataIndex: number
            ) => {
              return record[key] ? (
                <span>{value}</span>
              ) : (
                <Input defaultValue={""} />
              );
            },
          };
         
          if (key === "value") {
            column.title = "price";
          }
          if (key === "key") {
            column.title = "name";
          }
          // if (key === "eventId") {
          //   column.title = "event";
          //   column.render = (
          //     value: string,
          //     record: unknown,
          //     dataIndex: number
          //   ) => {
          //     const selectedEvent: EventPayment | undefined = events.find(
          //       (ele: { id?: string }) => ele?.id === value
          //     );
          //     if (selectedEvent) return <span>{selectedEvent.title}</span>;
          //     return (
          //       <Form.Item label="Event" name="event">
          //         <Select value={""}>
          //           <Select.Option value="event1">Event 1</Select.Option>
          //           <Select.Option value="event2">Event 2</Select.Option>
          //           <Select.Option value="event3">
          //             add more option +
          //           </Select.Option>
          //         </Select>
          //       </Form.Item>
          //     );
          //   };
          // }
          if (key === "categoryId") {
            column.title = "category";
            column.render = (
              value: string,
              record: unknown,
              dataIndex: number
            ) => {
              const selectedCate: Category = categories.find(
                (ele: { id?: string }) => ele?.id === value
              );
              if (selectedCate?.key) {
                return <span>{selectedCate.key}</span>;
              }
              return (
                <Form.Item label="Category" name="category">
                  <Select value={""}>
                    <Select.Option value="category1">Category 1</Select.Option>
                    <Select.Option value="category2">Category 2</Select.Option>
                    <Select.Option value="event3">
                      add more option +
                    </Select.Option>
                    {/* Add more options as needed */}
                  </Select>
                </Form.Item>
              );
            };
          }
          if (key === "createAt") {
            column.render = (
              value: { seconds: number },
              record: unknown,
              dataIndex: number
            ) => {
              const date = value.seconds
                ? new Date(value.seconds * 1000)
                : new Date();
              const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
              const dateFormat = "YYYY/MM/DD";
              return record[key] ? (
                <span>{formattedDate}</span>
              ) : (
                <Form.Item label="Date" name="date">
                  <DatePicker
                    defaultValue={date.toString()}
                    format={dateFormat}
                  />
                </Form.Item>
              );
            };
          }

          return column;
        })
    : [];
};
