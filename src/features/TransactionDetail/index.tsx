import { useDataSource } from "@api/useDataSource";
import Loading from "@components/Spin";
import { findDocumentById_ } from "@services/FireBaseMethods";
import { NestedTransaction } from "./NestedTransaction";

type TransactionType = { documentName: string; id: string };
async function findTransaction({ documentName, id }: TransactionType) {
  const result = await findDocumentById_({ documentName, id });
  return result?.data;
}

const withFireBaseSource = (Component: (props: any) => JSX.Element) => {
  return (props: { id: string }) => {
    const { bills, isloading } = useDataSource(
      {
        documentName: "bills",
        id: props.id,
      },
      findTransaction,
      "bills"
    );
    return (
      <div className="bg-slate-100 p-[20px] m-[20px] rounded-[20px]">
        {isloading ? <Loading /> : <Component data={bills} />}
      </div>
    );
  };
};

export const TransactionDetail = withFireBaseSource(NestedTransaction);

