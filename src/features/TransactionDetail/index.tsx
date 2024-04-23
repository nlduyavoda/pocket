import { useDataSource } from "@api/useDataSource";
import Loading from "@components/Spin";
import { findDocumentById_ } from "@services/FireBaseMethods";
import { TRANSACTIONS } from "@services/utils";
import { NestedTransaction } from "./NestedTransaction";

async function findTransaction({ documentName, id }) {
  const result = await findDocumentById_({ documentName, id });
  return result?.data;
}

export const TransactionDetail = ({ id }: { id: string }) => {
  const { transactions, isloading } = useDataSource(
    {
      documentName: TRANSACTIONS,
      id: id,
    },
    findTransaction,
    TRANSACTIONS
  );
  return (
    <div className="bg-slate-100 p-[20px] m-[20px] rounded-[20px]">
      {isloading ? (
        <Loading />
      ) : (
        <NestedTransaction transactions={transactions} />
      )}
    </div>
  );
};

