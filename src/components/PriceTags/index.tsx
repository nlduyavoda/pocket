import { Tag } from "antd";

export type Price = number | string;
export const PriceTag = ({ price }: { price: Price }) => {
  const currency = formatCurrency(price);
  return <Tag>{currency}</Tag>;
};

const formatCurrency = (price: Price): string => {
  const nums = +price > 0 ? +price * 1000 : 0;
  return nums.toLocaleString("en-US") + " đ";
};
