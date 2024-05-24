import { LoadingLarge } from "@components/Spin";
import useQueries from "@hooks/useQueries";
import {
  getCollection_clone,
  handleMonthChange,
} from "@services/FireBaseMethods";
import { DATE_TIME_FORMAT } from "@utils/DateTime";
import { IDataSouces, QueryResult } from "Types/FirebaseSource";
import { IWithPaymentMethodsProps } from "Types/IPayment";
import { format } from "date-fns";
import React, { ComponentType, useState } from "react";

const fetchingPayments = async (selectedDate: string) => {
  const { status, data } = await handleMonthChange({ month: 5, year: 2024 });
  if (status === "ok") {
    for (let payment of data) {
      const date = format(
        new Date(payment.createAt.toDate()),
        DATE_TIME_FORMAT
      );
      payment.createAt = date;
    }
    return data;
  } else return [];
};

export async function fetchDataSource(sourceName: string) {
  try {
    const respponse = await getCollection_clone({
      collectionName: sourceName,
    });
    // console.log(`fetchDataSource - [${sourceName}]: >>`, respponse);
    return respponse;
  } catch (error) {
    console.log(`error: [${sourceName}]>>`, error);
    return [];
  }
}

const currentDate = new Date().toISOString();

const onFormatBills = ({ bills, categories, events }: IDataSouces) => {
  if (!bills?.length || !events?.length || !categories?.length) return [];
  return bills.map((item: any) => {
    const category =
      categories.find((category: any) => category.id === item.categoryId) ||
      null;
    const event =
      events.find((event: any) => event.id === item.eventId) || null;
    return {
      id: item.id,
      key: item.key,
      value: item.value,
      createAt: item.createAt,
      category,
      event,
    };
  });
};

const withPaymentMethods =
  <P extends object>(
    Component: ComponentType<P>
  ): React.FC<P & IWithPaymentMethodsProps> =>
  (props) => {
    const dataSources = [
      {
        sourceName: "bills",
        fetchFunction: () => fetchingPayments(currentDate),
      },
      {
        sourceName: "categories",
        fetchFunction: () => fetchDataSource("categories"),
      },
      {
        sourceName: "events",
        fetchFunction: () => fetchDataSource("events"),
      },
    ];

    const { data, loading, error }: QueryResult = useQueries(dataSources);
    const { bills, categories, events } = data;
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const handleSetSelectedDate = (date: string) => setSelectedDate(date);
    if (loading) return <LoadingLarge />;
    if (error) return <div>With Payment Methods Error</div>;
    if (bills && bills.length < 0) return <div>empty payment</div>;

    return (
      <Component
        {...props}
        onSetSelectedDate={handleSetSelectedDate}
        selectedDate={selectedDate}
        originalData={onFormatBills({ ...data })}
        categories={categories}
        events={events}
      />
    );
  };

export default withPaymentMethods;
