import Loading from "@components/Spin";
import { TableOverview } from "@components/Table";
import useFirebaseSource from "@hooks/useFirebaseSource";
import { getCollection } from "@services/FireBaseMethods";
import { ColumnsType } from "antd/es/table";

type SourceType = {
  sourceName: string;
  status?: string;
  data: any;
};

type RequestType = Promise<SourceType>;

type FirebaseBill = {
  id: string;
  key: string;
  categoryId: string;
  createAt: any;
  eventId: string;
};

type CustomType = {
  dataIndex: string;
  fixed: "left" | undefined;
  key: string;
  title: string;
  width: number;
};

type DataPropUpdate = { bills: unknown[]; categories: unknown[] };

type FirebaseSource = {
  bills: unknown[];
  categories: unknown[];
};

async function fetchDataSource(sourceName: string): RequestType {
  const response = await getCollection({
    collectionName: sourceName,
  });
  return {
    sourceName: sourceName,
    data: response.status === "ok" ? response.data : [],
  };
}

const getPaymentSource = async (sourceNames: string[]) => {
  const requests: RequestType[] = sourceNames.map((sourceName: string) =>
    fetchDataSource(sourceName)
  );

  const response: SourceType[] = await Promise.all(requests);
  let result: { [key: string]: any } = {}; // Add index signature to the result object
  for (let item of response) {
    result[item.sourceName] = item.data;
  }
  return { status: "ok", data: result }; // Return the result object directly
};

export const withFireBaseSource = (
  Component: (props: unknown) => JSX.Element
) => {
  return (props: any) => {
    const { data, isLoading, isError } = useFirebaseSource(() =>
      getPaymentSource(["bills", "categories"])
    ) as { data: unknown; isLoading: boolean; isError: boolean };
    if (isLoading) return <Loading />;
    if (isError) return <div>error</div>;
    const { bills = [], categories = [] } = data as FirebaseSource;
    return bills.length && categories.length ? (
      <Component {...props} bills={bills} categories={categories} />
    ) : (
      <>empty data</>
    );
  };
};

export const ComponentInternal = ({
  bills = [],
  categories = [],
}: DataPropUpdate) => {
  const columns: ColumnsType<CustomType> = bills[0]
    ? Object.entries(bills[0])
        .filter(([key, _]) => key !== "id")
        .map(([key, _]) => {
          const column: CustomType = {
            dataIndex: key,
            key,
            title: key,
            width: 100,
          };
          if (key === "categoryId") {
            column.render = (value, record, dataIndex) => {
              const selectedCate =
                categories.find((ele) => ele.id === value) || null;
              return <span>{selectedCate?.key}</span>;
            };
          }
          if (key === "createAt") {
            column.render = (value, record, dataIndex) => {
              const date = new Date(value.seconds * 1000);
              const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
              return <span>{formattedDate}</span>;
            };
          }
          return column;
        })
    : [];
  return (
    <div className="flex w-full justify-center items-center">
      <TableOverview dataSource={bills} columns={columns} bordered />
    </div>
  );
};

export const OverviewTable = withFireBaseSource(ComponentInternal);
