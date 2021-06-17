import { FC } from "react";

interface TokenBalance {
  denom: string;
  amount: number;
}
interface BalanceProps {
  tokenBalance: TokenBalance[];
}

const Balance: FC<BalanceProps> = (props) => {
  const { tokenBalance } = props;
  return (
    <ul>
      {tokenBalance.map((item: TokenBalance) => (
        <li key={item.denom}>
          <span>{item.amount} </span>
          <span>{item.denom}</span>
        </li>
      ))}
    </ul>
  );
};

export default Balance;
