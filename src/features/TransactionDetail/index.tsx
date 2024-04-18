import { useDataSource } from "@api/useDataSource";
import Loading from "@components/Spin";
import { findDocumentById_ } from "@services/FireBaseMethods";
import { TRANSACTIONS } from "@services/utils";
import { useParams } from "react-router-dom";
import { NestedTransaction } from "./NestedTransaction";

async function findTransaction({ documentName, id }) {
  const result = await findDocumentById_({ documentName, id });
  return result?.data;
}

export const TransactionDetail = () => {
  const { transactionId } = useParams();
  const { transactions, isloading } = useDataSource(
    {
      documentName: TRANSACTIONS,
      id: transactionId,
    },
    findTransaction,
    TRANSACTIONS
  );
  return (
    <div className="bg-slate-100 p-[20px] m-[20px] rounded-[20px] h-fit">
      {isloading ? (
        <Loading />
      ) : (
        <NestedTransaction transactions={transactions} />
      )}
    </div>
  );
};

